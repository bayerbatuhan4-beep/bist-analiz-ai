import {
  BIST_STOCKS,
  normalizeTurkish,
  searchStocks
} from './data/bist-stocks.js';

const QUICK_STOCKS = BIST_STOCKS.slice(0, 20);
const SUGGESTED_QUESTIONS = [
  'BIST 100 genel görünümü nasıl?',
  'Bu hissenin son fiyat hareketi ne gösteriyor?',
  'Son haberlerin piyasaya olası etkisi nedir?'
];

// State
let currentStockKey = 'THYAO';
let currentTimeframe = '1d';
let currentViewMode = 'basit';
let currentStock = null;
let currentNews = [];
let chatHistory = [];
let stockRequestId = 0;
let currentSearchResults = [];
let activeDropdownIndex = -1;

// ==========================================
// Theme Management (Lacivert / Altın / Açık)
// ==========================================
const THEME_STORAGE_KEY = 'bist_theme';
const VALID_THEMES = ['lacivert', 'altin', 'acik'];

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (VALID_THEMES.includes(saved)) {
      return saved;
    }
  } catch (e) {
    // Storage access might be restricted
  }
  return 'lacivert';
}

function setTheme(theme) {
  if (!VALID_THEMES.includes(theme)) {
    theme = 'lacivert';
  }

  // Update data-theme on <html>
  document.documentElement.setAttribute('data-theme', theme);

  // Update meta theme-color for mobile browser toolbar
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    const metaColors = {
      lacivert: '#0B1426',
      altin: '#0F1115',
      acik: '#F4F6FA'
    };
    metaThemeColor.setAttribute('content', metaColors[theme] || '#0B1426');
  }

  // Sync theme switcher buttons aria-pressed and active classes
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    const val = btn.getAttribute('data-theme-val');
    const isActive = val === theme;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Persist to localStorage safely inside try/catch
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    // Graceful fallback if storage fails
  }

  // Re-render chart if already mounted so SVG and canvas states match theme immediately
  if (svgChartContainer && currentStock) {
    renderActiveChart();
  }
}

function initThemeSwitcher() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || getSavedTheme();
  setTheme(currentTheme);

  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeVal = btn.getAttribute('data-theme-val');
      if (themeVal) {
        setTheme(themeVal);
      }
    });
  });
}

// DOM Elements
const tickerContainer = document.getElementById('tickerItemsContainer');
const newsListContainer = document.getElementById('newsListContainer');
const suggestedButtonsContainer = document.getElementById('suggestedButtonsContainer');
const chatContainer = document.getElementById('chatContainer');
const aiInputForm = document.getElementById('aiInputForm');
const aiQuestionInput = document.getElementById('aiQuestionInput');
const stockSearchForm = document.getElementById('stockSearchForm');
const stockSearchInput = document.getElementById('stockSearchInput');
const stockAutocompleteList = document.getElementById('stockAutocompleteList');
const chipsList = document.getElementById('chipsList');

// Chart card DOM elements
const stockSymbolDisplay = document.getElementById('stockSymbolDisplay');
const stockNameDisplay = document.getElementById('stockNameDisplay');
const stockDemoBadge = document.getElementById('stockDemoBadge');
const stockPriceContainer = document.getElementById('stockPriceContainer');
const stockPriceDisplay = document.getElementById('stockPriceDisplay');
const stockChangeDisplay = document.getElementById('stockChangeDisplay');
const stockSectorDisplay = document.getElementById('stockSectorDisplay');
const chartControlsWrap = document.getElementById('chartControlsWrap');
const chartViewToggle = document.getElementById('chartViewToggle');
const timeframeSelector = document.getElementById('timeframeSelector');
const chartWrapper = document.getElementById('chartWrapper');
const svgChartContainer = document.getElementById('svgChartContainer');
const chartScreenReaderSummary = document.getElementById('chartScreenReaderSummary');
const chartTooltip = document.getElementById('chartTooltip');
const noDataCard = document.getElementById('noDataCard');
const noDataStockTitle = document.getElementById('noDataStockTitle');
const metricsGrid = document.getElementById('metricsGrid');
const metricHigh = document.getElementById('metricHigh');
const metricLow = document.getElementById('metricLow');
const metricVolume = document.getElementById('metricVolume');
const metricPE = document.getElementById('metricPE');
const stockNoteCard = document.getElementById('stockNoteCard');
const stockSummaryText = document.getElementById('stockSummaryText');

/**
 * Top Navigation Links Smooth Scroll & Panel Focus
 * Ensures all links work reliably on both desktop and mobile
 */
function initNavLinks() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();

      if (href === '#piyasa') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const header = document.querySelector('.top-bar');
        const headerHeight = header ? header.offsetHeight : 70;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        });

        // Trigger pulse highlight on target panel for clear visual feedback
        target.classList.remove('panel-highlight');
        void target.offsetWidth;
        target.classList.add('panel-highlight');
        setTimeout(() => {
          target.classList.remove('panel-highlight');
        }, 1500);
      }
    });
  });
}

const TICKER_NAMES = { BIST100: 'BIST 100', BIST30: 'BIST 30', USDTRY: 'USD/TRY' };

function formatPrice(value, currency = 'TRY') {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + (currency === 'TRY' ? ' TL' : ` ${currency}`);
}

function formatChange(value) {
  if (!Number.isFinite(value)) return '—';
  return `${value >= 0 ? '+' : ''}%${new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
}

async function getJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `İstek başarısız (${response.status}).`);
  return payload;
}

async function renderTicker() {
  if (!tickerContainer) return;
  tickerContainer.innerHTML = '<span class="data-loading">Piyasa verisi alınıyor…</span>';
  try {
    const { quotes } = await getJson('/api/market?symbols=BIST100%2CBIST30%2CUSDTRY');
    tickerContainer.innerHTML = quotes.map(item => {
      if (!Number.isFinite(item.price)) return '';
      const up = (item.changePercent ?? 0) >= 0;
      return `<div class="ticker-item"><span class="ticker-name">${TICKER_NAMES[item.symbol]}:</span><span class="ticker-val">${formatPrice(item.price, item.currency || 'TRY')}</span><span class="ticker-chg ${up ? 'up' : 'down'}">${formatChange(item.changePercent)}</span></div>`;
    }).join('') || '<span class="data-loading">Piyasa verisi şu an kullanılamıyor.</span>';
  } catch (error) {
    tickerContainer.innerHTML = `<span class="data-loading">${escapeHtml(error.message)}</span>`;
  }
}

/**
 * Render quick stock choices from the supported BIST symbols
 */
function renderChips() {
  if (!chipsList) return;

  chipsList.innerHTML = QUICK_STOCKS.map(stock => {
    const isActive = stock.code === currentStockKey;
    return `
      <button 
        type="button" 
        class="chip-button ${isActive ? 'active' : ''}" 
        data-symbol="${stock.code}"
        title="${stock.code} - ${escapeHtml(stock.name)}"
      >
        ${stock.code}
      </button>
    `;
  }).join('');
}

/**
 * Update quick chips active highlighting
 */
function updateActiveChip(symbol) {
  if (!chipsList) return;
  chipsList.querySelectorAll('.chip-button').forEach(btn => {
    const match = btn.getAttribute('data-symbol') === symbol;
    btn.classList.toggle('active', match);
    if (match) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  });
}

/**
 * Render Active Chart based on currentViewMode ('basit' vs 'detayli')
 */
function renderActiveChart() {
  const stock = currentStock;
  if (!stock) return;

  if (currentViewMode === 'detayli') {
    renderCandleChart(stock, currentTimeframe);
  } else {
    renderSvgChart(stock, currentTimeframe);
  }

  // Update screen reader text summary
  if (chartScreenReaderSummary) {
    chartScreenReaderSummary.textContent = `${stock.symbol} (${stock.name}), ${stock.candles.length} fiyat noktası. Son fiyat ${formatPrice(stock.price)}. Veri zamanı ${formatDate(stock.asOf)}.`;
  }
}

/**
 * Update Stock Display in Center Panel
 * Shows full demo chart, stats & note if stock has demo data.
 * Shows clear Turkish no-data card if stock has no demo data. Never invents prices.
 */
async function updateStockDisplay(symbolKey, customName) {
  if (!symbolKey) return;
  const requestId = ++stockRequestId;
  const rawKey = symbolKey.trim().toUpperCase();
  currentStockKey = rawKey;
  const retainedStock = currentStock?.symbol === rawKey ? currentStock : null;
  currentStock = retainedStock;
  const found = BIST_STOCKS.find(s => s.code.toUpperCase() === rawKey);
  const displayName = customName || found?.name || rawKey;
  if (stockSymbolDisplay) stockSymbolDisplay.textContent = rawKey;
  if (stockNameDisplay) stockNameDisplay.textContent = displayName;
  const status = document.getElementById('noDataText');
  if (stockDemoBadge) stockDemoBadge.textContent = retainedStock ? 'Piyasa verisi yenileniyor…' : 'Kaynak: Yahoo Finance · gecikmeli olabilir';
  if (!retainedStock) {
    if (stockPriceContainer) stockPriceContainer.classList.add('hidden');
    if (chartWrapper) chartWrapper.classList.add('hidden');
    if (metricsGrid) metricsGrid.classList.add('hidden');
    if (stockNoteCard) stockNoteCard.classList.add('hidden');
    if (noDataCard) noDataCard.classList.remove('hidden');
    if (noDataStockTitle) noDataStockTitle.textContent = `${rawKey} · ${displayName}`;
    if (status) status.textContent = 'Piyasa verisi alınıyor…';
  }
  updateActiveChip(rawKey);
  if (timeframeSelector) timeframeSelector.classList.remove('hidden');
  if (chartViewToggle) chartViewToggle.classList.remove('hidden');
  if (chartControlsWrap) chartControlsWrap.classList.remove('hidden');
  try {
    const payload = await getJson(`/api/market?symbol=${encodeURIComponent(rawKey)}&timeframe=${encodeURIComponent(currentTimeframe)}`);
    if (requestId !== stockRequestId) return;
    currentStock = {
      ...payload,
      candles: payload.candles.map(c => ({
        ...c,
        label: new Intl.DateTimeFormat('tr-TR', currentTimeframe === '1mo' ? { day: '2-digit', month: '2-digit', timeZone: 'Europe/Istanbul' } : { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' }).format(new Date(c.timestamp)),
        isUp: c.close >= c.open
      }))
    };
    if (stockNameDisplay) stockNameDisplay.textContent = found?.name || payload.name || displayName;
    if (stockDemoBadge) stockDemoBadge.textContent = `Kaynak: ${payload.source} · ${formatDate(payload.asOf)}`;
    if (stockPriceContainer) stockPriceContainer.classList.remove('hidden');
    if (stockPriceDisplay) stockPriceDisplay.textContent = formatPrice(payload.price, payload.currency);
    const up = (payload.changePercent ?? 0) >= 0;
    if (stockChangeDisplay) {
      stockChangeDisplay.className = `stock-change-pill ${up ? 'up' : 'down'}`;
      stockChangeDisplay.innerHTML = `<span class="pill-arrow" aria-hidden="true">${up ? '▲' : '▼'}</span><span class="pill-text">${formatChange(payload.changePercent)}</span>`;
    }
    if (stockSectorDisplay) stockSectorDisplay.textContent = `Veri zamanı: ${formatDate(payload.asOf)}`;
    if (metricHigh) metricHigh.textContent = formatPrice(payload.dayHigh, payload.currency);
    if (metricLow) metricLow.textContent = formatPrice(payload.dayLow, payload.currency);
    if (metricVolume) metricVolume.textContent = Number(payload.volume).toLocaleString('tr-TR');
    if (metricPE) metricPE.textContent = Number.isFinite(payload.previousClose) ? formatPrice(payload.previousClose, payload.currency) : '—';
    if (metricsGrid) metricsGrid.classList.remove('hidden');
    if (stockNoteCard) stockNoteCard.classList.add('hidden');
    if (chartWrapper) chartWrapper.classList.remove('hidden');
    if (noDataCard) noDataCard.classList.add('hidden');
    renderActiveChart();
  } catch (error) {
    if (requestId !== stockRequestId) return;
    if (retainedStock) {
      if (stockDemoBadge) stockDemoBadge.textContent = `Güncelleme başarısız · ${formatDate(retainedStock.asOf)}`;
      return;
    }
    if (noDataStockTitle) noDataStockTitle.textContent = `${rawKey} için veri alınamadı`;
    if (status) status.textContent = `${error.message} Sembolü kontrol edin veya daha sonra tekrar deneyin.`;
  }
}

function formatDate(timestamp) {
  if (!timestamp) return 'zaman bilgisi yok';
  return new Intl.DateTimeFormat('tr-TR', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Istanbul' }).format(new Date(timestamp));
}

/**
 * Render Interactive Inline SVG Chart (Basit Görünüm)
 * Pure SVG mathematical projection with hover crosshair and tooltips
 */
function renderSvgChart(stock, timeframe) {
  if (!svgChartContainer) return;

  svgChartContainer.setAttribute('aria-label', `${stock.symbol} ${timeframe} fiyat çizgi grafiği`);

  const series = stock.candles.map(c => ({ value: c.close, label: c.label }));
  if (!series.length) return;
  const values = series.map(d => d.value);

  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.12 || 1;
  const domainMin = minVal - padding;
  const domainMax = maxVal + padding;

  const width = 600;
  const height = 290;
  const padLeft = 55;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 35;

  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  // Coordinate mappers
  const getX = (index) => padLeft + (index / (series.length - 1)) * chartWidth;
  const getY = (val) => padTop + chartHeight - ((val - domainMin) / (domainMax - domainMin)) * chartHeight;

  // Generate SVG Points
  const points = series.map((d, i) => ({
    x: getX(i),
    y: getY(d.value),
    label: d.label,
    value: d.value
  }));

  // Build line path
  const linePathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // Build area fill path
  const areaPathD = `${linePathD} L ${points[points.length - 1].x} ${padTop + chartHeight} L ${points[0].x} ${padTop + chartHeight} Z`;

  // Colors based on trend (CSS Custom Properties)
  const strokeColor = (stock.changePercent ?? 0) >= 0 ? 'var(--color-green)' : 'var(--color-red)';

  // 4 Horizontal Grid Lines
  const gridSteps = 4;
  let gridLinesHtml = '';
  for (let s = 0; s <= gridSteps; s++) {
    const val = domainMin + (s / gridSteps) * (domainMax - domainMin);
    const yPos = getY(val);
    gridLinesHtml += `
      <line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="var(--chart-grid)" stroke-dasharray="3 3" stroke-width="1" />
      <text x="${padLeft - 8}" y="${(yPos + 4).toFixed(1)}" fill="var(--chart-grid-text)" font-size="10" text-anchor="end" font-family="sans-serif">${val.toFixed(2)}</text>
    `;
  }

  // X-axis labels
  const labelEvery = Math.max(1, Math.ceil(points.length / 8));
  const xLabelsHtml = points.map((pt, i) => i % labelEvery === 0 || i === points.length - 1 ? `
    <text x="${pt.x.toFixed(1)}" y="${height - 10}" fill="var(--text-muted)" font-size="10" text-anchor="middle" font-family="sans-serif">${pt.label}</text>
  ` : '').join('');

  // Interactive Hover Dots
  const dotsHtml = points.map((pt, i) => `
    <circle 
      cx="${pt.x.toFixed(1)}" 
      cy="${pt.y.toFixed(1)}" 
      r="4.5" 
      fill="${strokeColor}" 
      stroke="var(--chart-bg)" 
      stroke-width="2" 
      class="chart-point" 
      data-index="${i}"
      tabindex="0"
      role="button"
      aria-label="${pt.label}: ${pt.value.toFixed(2)} TL"
    />
  `).join('');

  const svgContent = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="market-svg" aria-hidden="true">
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.32" />
          <stop offset="100%" stop-color="var(--chart-bg)" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Background Grid -->
      ${gridLinesHtml}

      <!-- Area fill -->
      <path d="${areaPathD}" fill="url(#areaGradient)" />

      <!-- Price line -->
      <path d="${linePathD}" fill="none" stroke="${strokeColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Data Points -->
      ${dotsHtml}

      <!-- X-axis Labels -->
      ${xLabelsHtml}
    </svg>
  `;

  svgChartContainer.innerHTML = svgContent;

  // Attach hover/focus tooltips to dots
  const circles = svgChartContainer.querySelectorAll('.chart-point');
  circles.forEach(circle => {
    const showTip = () => {
      const idx = parseInt(circle.getAttribute('data-index'), 10);
      const pt = points[idx];
      if (chartTooltip) {
        chartTooltip.innerHTML = `
          <div class="tooltip-header">
            <span class="tooltip-label">${pt.label}</span>
            <span class="demo-tag">Yahoo Finance</span>
          </div>
          <div class="tooltip-row">
            <span>Fiyat:</span> <strong>${pt.value.toFixed(2)} TL</strong>
          </div>
        `;
        chartTooltip.classList.add('visible');
      }
    };

    const hideTip = () => {
      if (chartTooltip) {
        chartTooltip.classList.remove('visible');
      }
    };

    circle.addEventListener('mouseenter', showTip);
    circle.addEventListener('focus', showTip);
    circle.addEventListener('mouseleave', hideTip);
    circle.addEventListener('blur', hideTip);
  });
}

/**
 * Render Detaylı Candlestick Chart (Detaylı Görünüm)
 * Candlestick bars (green up, red down) + volume bars + moving average (SMA-5)
 * Horizontal price grid lines with labels + hover/keyboard-focus OHLC & volume tooltip
 */
function renderCandleChart(stock, timeframe) {
  if (!svgChartContainer) return;

  svgChartContainer.setAttribute('aria-label', `${stock.symbol} ${timeframe} detaylı mum grafiği`);

  const candles = stock.candles || [];
  if (!candles.length) return;

  const minLow = Math.min(...candles.map(c => c.low));
  const maxHigh = Math.max(...candles.map(c => c.high));
  const padding = (maxHigh - minLow) * 0.08 || 1;
  const domainMin = minLow - padding;
  const domainMax = maxHigh + padding;

  const width = 600;
  const height = 290;
  const padLeft = 55;
  const padRight = 20;
  const padTop = 32;
  const priceHeight = 155; // Y: 32 to 187
  const volTop = 204;
  const volHeight = 52; // Y: 204 to 256
  const chartWidth = width - padLeft - padRight;

  const getY = (val) => padTop + priceHeight - ((val - domainMin) / (domainMax - domainMin)) * priceHeight;

  const maxVol = Math.max(...candles.map(c => c.volume)) || 1;
  const getVolH = (vol) => Math.max(2, (vol / maxVol) * volHeight);

  const candleSpacing = chartWidth / candles.length;
  const candleWidth = Math.max(5, Math.min(16, candleSpacing * 0.65));
  const getX = (i) => padLeft + (i + 0.5) * candleSpacing;

  // Horizontal Price Grid Lines
  const gridSteps = 4;
  let gridLinesHtml = '';
  for (let s = 0; s <= gridSteps; s++) {
    const val = domainMin + (s / gridSteps) * (domainMax - domainMin);
    const yPos = getY(val);
    gridLinesHtml += `
      <line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="var(--chart-grid)" stroke-dasharray="3 3" stroke-width="1" />
      <text x="${padLeft - 8}" y="${(yPos + 3.5).toFixed(1)}" fill="var(--chart-grid-text)" font-size="10" text-anchor="end" font-family="sans-serif">${val.toFixed(2)}</text>
    `;
  }

  // Volume separator & label
  const volSeparatorHtml = `
    <line x1="${padLeft}" y1="${volTop - 4}" x2="${width - padRight}" y2="${volTop - 4}" stroke="var(--chart-grid)" stroke-width="1" />
    <text x="${padLeft - 8}" y="${volTop + 10}" fill="var(--chart-grid-text)" font-size="9" text-anchor="end" font-family="sans-serif">Hacim</text>
  `;

  // Moving Average SMA-5
  const maPeriod = 5;
  const maPoints = [];
  for (let i = 0; i < candles.length; i++) {
    const startIdx = Math.max(0, i - maPeriod + 1);
    const slice = candles.slice(startIdx, i + 1);
    const avg = slice.reduce((sum, c) => sum + c.close, 0) / slice.length;
    maPoints.push({ x: getX(i), y: getY(avg) });
  }
  const maPathD = maPoints.reduce((acc, pt, i) => i === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');

  // X-axis labels
  const labelEvery = Math.max(1, Math.ceil(candles.length / 8));
  const xLabelsHtml = candles.map((c, i) => i % labelEvery === 0 || i === candles.length - 1 ? `
    <text x="${getX(i).toFixed(1)}" y="${height - 10}" fill="var(--text-muted)" font-size="9" text-anchor="middle" font-family="sans-serif">${c.label}</text>
  ` : '').join('');

  // Candlesticks and Volume Bars
  const candlesHtml = candles.map((c, i) => {
    const cx = getX(i);
    const isUp = c.close >= c.open;
    const color = isUp ? 'var(--color-green)' : 'var(--color-red)';
    const vColor = isUp ? 'var(--volume-bar-up)' : 'var(--volume-bar-down)';
    const wickY1 = getY(c.high);
    const wickY2 = getY(c.low);
    const bodyTop = getY(Math.max(c.open, c.close));
    const bodyBottom = getY(Math.min(c.open, c.close));
    const bodyH = Math.max(2.5, bodyBottom - bodyTop);

    const vH = getVolH(c.volume);
    const vY = volTop + volHeight - vH;

    return `
      <g 
        class="chart-candle-item" 
        data-index="${i}" 
        tabindex="0" 
        role="button" 
        aria-label="${c.label}: Açılış ${c.open.toFixed(2)} TL, Yüksek ${c.high.toFixed(2)} TL, Düşük ${c.low.toFixed(2)} TL, Kapanış ${c.close.toFixed(2)} TL, Hacim ${c.volume.toLocaleString('tr-TR')} Lot"
      >
        <!-- Full-column transparent hitbox for easy hover/touch hit -->
        <rect x="${(cx - candleSpacing / 2).toFixed(1)}" y="${padTop}" width="${candleSpacing.toFixed(1)}" height="${volTop + volHeight - padTop}" fill="transparent" class="candle-hitbox" />
        
        <!-- Wick line -->
        <line x1="${cx.toFixed(1)}" y1="${wickY1.toFixed(1)}" x2="${cx.toFixed(1)}" y2="${wickY2.toFixed(1)}" stroke="${color}" stroke-width="1.5" />
        
        <!-- Candle body -->
        <rect x="${(cx - candleWidth / 2).toFixed(1)}" y="${bodyTop.toFixed(1)}" width="${candleWidth.toFixed(1)}" height="${bodyH.toFixed(1)}" fill="${color}" stroke="${color}" stroke-width="1" rx="1" />
        
        <!-- Volume bar -->
        <rect x="${(cx - candleWidth / 2).toFixed(1)}" y="${vY.toFixed(1)}" width="${candleWidth.toFixed(1)}" height="${vH.toFixed(1)}" fill="${vColor}" rx="1" />
      </g>
    `;
  }).join('');

  const svgContent = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="market-svg" aria-hidden="true">
      <!-- Indicators Header Legend -->
      <g class="chart-legend">
        <circle cx="55" cy="14" r="3.5" fill="var(--chart-ma)" />
        <text x="63" y="17" fill="var(--text-muted)" font-size="9.5" font-family="sans-serif">HO(5) Hareketli Ortalama</text>
        <rect x="200" y="10.5" width="7" height="7" fill="var(--color-green)" rx="1" />
        <text x="211" y="17" fill="var(--text-muted)" font-size="9.5" font-family="sans-serif">Yükseliş</text>
        <rect x="260" y="10.5" width="7" height="7" fill="var(--color-red)" rx="1" />
        <text x="271" y="17" fill="var(--text-muted)" font-size="9.5" font-family="sans-serif">Düşüş</text>
      </g>

      <!-- Horizontal Price Grid Lines -->
      ${gridLinesHtml}

      <!-- Volume separator -->
      ${volSeparatorHtml}

      <!-- Moving Average Line -->
      <path d="${maPathD}" fill="none" stroke="var(--chart-ma)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Candlesticks and Volume Bars -->
      ${candlesHtml}

      <!-- X-axis Labels -->
      ${xLabelsHtml}
    </svg>
  `;

  svgChartContainer.innerHTML = svgContent;

  // Attach hover and keyboard-focus listeners to candles
  const items = svgChartContainer.querySelectorAll('.chart-candle-item');
  items.forEach(item => {
    const showTip = () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      const c = candles[idx];
      if (!c || !chartTooltip) return;

      const isUp = c.close >= c.open;
      const chgVal = c.close - c.open;
      const chgSign = chgVal >= 0 ? '+' : '';
      const chgPct = ((chgVal / c.open) * 100).toFixed(2);

      chartTooltip.innerHTML = `
        <div class="tooltip-header">
          <span class="tooltip-label">${c.label}</span>
          <span class="demo-tag">Yahoo Finance</span>
        </div>
        <div class="tooltip-grid">
          <div class="tooltip-row"><span>Açılış:</span> <strong>${c.open.toFixed(2)} TL</strong></div>
          <div class="tooltip-row"><span>Yüksek:</span> <strong>${c.high.toFixed(2)} TL</strong></div>
          <div class="tooltip-row"><span>Düşük:</span> <strong>${c.low.toFixed(2)} TL</strong></div>
          <div class="tooltip-row"><span>Kapanış:</span> <strong style="color:${isUp ? 'var(--color-green)' : 'var(--color-red)'}">${c.close.toFixed(2)} TL (${chgSign}%${chgPct})</strong></div>
          <div class="tooltip-row tooltip-volume-row"><span>Hacim:</span> <strong>${c.volume.toLocaleString('tr-TR')} Lot</strong></div>
        </div>
      `;
      chartTooltip.classList.add('visible');
    };

    const hideTip = () => {
      if (chartTooltip) {
        chartTooltip.classList.remove('visible');
      }
    };

    item.addEventListener('mouseenter', showTip);
    item.addEventListener('focus', showTip);
    item.addEventListener('mouseleave', hideTip);
    item.addEventListener('blur', hideTip);
  });
}

/**
 * Autocomplete Dropdown Controls
 */
function showAutocomplete() {
  if (stockAutocompleteList) {
    stockAutocompleteList.classList.remove('hidden');
    if (stockSearchInput) {
      stockSearchInput.setAttribute('aria-expanded', 'true');
    }
  }
}

function hideAutocomplete() {
  if (stockAutocompleteList) {
    stockAutocompleteList.classList.add('hidden');
    stockAutocompleteList.innerHTML = '';
    activeDropdownIndex = -1;
    currentSearchResults = [];
    if (stockSearchInput) {
      stockSearchInput.setAttribute('aria-expanded', 'false');
      stockSearchInput.removeAttribute('aria-activedescendant');
    }
  }
}

/**
 * Render Autocomplete Results (Turkish-aware, accent-insensitive)
 */
function renderAutocompleteResults(query) {
  if (!stockAutocompleteList || !stockSearchInput) return;

  const trimmed = query.trim();
  if (!trimmed) {
    hideAutocomplete();
    return;
  }

  currentSearchResults = searchStocks(trimmed, 8);
  activeDropdownIndex = -1;

  if (currentSearchResults.length > 0) {
    stockAutocompleteList.innerHTML = currentSearchResults.map((stock, idx) => `
      <li 
        id="stock-opt-${idx}" 
        role="option" 
        class="autocomplete-item" 
        aria-selected="false"
        data-index="${idx}"
        data-code="${stock.code}"
        data-name="${escapeHtml(stock.name)}"
      >
        <span class="autocomplete-code">${stock.code}</span>
        <span class="autocomplete-name">${escapeHtml(stock.name)}</span>
      </li>
    `).join('');
    showAutocomplete();
  } else {
    // If no match found in BIST_STOCKS, offer to inspect typed code
    const cleanTyped = trimmed.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ]/g, '').toUpperCase() || trimmed.toUpperCase();
    stockAutocompleteList.innerHTML = `
      <li 
        id="stock-opt-fallback" 
        role="option" 
        class="autocomplete-fallback" 
        aria-selected="false"
        data-code="${cleanTyped}"
        data-name="${cleanTyped}"
      >
        <span>Sonuç bulunamadı — <strong class="autocomplete-fallback-code">${cleanTyped}</strong> hissesini incele</span>
        <span aria-hidden="true">↵</span>
      </li>
    `;
    showAutocomplete();
  }
}

/**
 * Update Highlighted Item in Autocomplete Dropdown
 */
function updateActiveDropdownHighlight() {
  if (!stockAutocompleteList) return;

  const items = stockAutocompleteList.querySelectorAll('[role="option"]');
  items.forEach((item, idx) => {
    const isSelected = idx === activeDropdownIndex;
    item.classList.toggle('highlighted', isSelected);
    item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    if (isSelected) {
      stockSearchInput.setAttribute('aria-activedescendant', item.id);
      item.scrollIntoView({ block: 'nearest' });
    }
  });

  if (activeDropdownIndex < 0 && stockSearchInput) {
    stockSearchInput.removeAttribute('aria-activedescendant');
  }
}

/**
 * Select a Stock from Search / Dropdown
 */
function selectStock(code, name) {
  if (!code) return;
  updateStockDisplay(code, name);
  renderNews(code);
  if (stockSearchInput) {
    stockSearchInput.value = '';
  }
  hideAutocomplete();

  // On narrow screens, scroll smoothly to chart
  if (window.innerWidth <= 1080) {
    const chartSection = document.getElementById('grafik');
    if (chartSection) {
      const header = document.querySelector('.top-bar');
      const headerHeight = header ? header.offsetHeight : 70;
      const targetTop = chartSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  }
}

async function renderNews(symbol = '') {
  if (!newsListContainer) return;
  newsListContainer.innerHTML = '<li class="news-state">Güncel haberler yükleniyor…</li>';
  try {
    const payload = await getJson(`/api/news${symbol ? `?symbol=${encodeURIComponent(symbol)}` : ''}`);
    currentNews = payload.items || [];
    newsListContainer.replaceChildren();
    if (!currentNews.length) {
      newsListContainer.innerHTML = '<li class="news-state">Bu arama için haber bulunamadı.</li>';
      return;
    }
    currentNews.forEach(item => {
      const li = document.createElement('li');
      li.className = 'news-item';
      const meta = document.createElement('div');
      meta.className = 'news-meta-row';
      const source = document.createElement('span');
      source.className = 'news-category';
      source.textContent = item.source;
      const time = document.createElement('time');
      time.className = 'news-time';
      time.dateTime = item.publishedAt || '';
      time.textContent = item.publishedAt ? formatDate(item.publishedAt) : 'Yayın zamanı yok';
      meta.append(source, time);
      const link = document.createElement('a');
      link.className = 'news-title';
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item.title;
      const actions = document.createElement('div');
      actions.className = 'news-actions';
      const ask = document.createElement('button');
      ask.type = 'button';
      ask.className = 'news-ask-ai-btn';
      ask.textContent = "Bu haberi AI'ya sor";
      ask.addEventListener('click', () => {
        handleUserQuery('Bu haberin olası piyasa etkisini, mevcut verilerle sınırlı kalarak açıklar mısın?', { news: [item] });
        const panel = document.getElementById('ai-asistan');
        panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      actions.append(ask);
      li.append(meta, link, actions);
      newsListContainer.append(li);
    });
  } catch (error) {
    currentNews = [];
    newsListContainer.innerHTML = `<li class="news-state">${escapeHtml(error.message)} Haber akışı sonra yeniden denenebilir.</li>`;
  }
}

/**
 * Render Suggested Question Buttons
 */
function renderSuggestedQuestions() {
  if (!suggestedButtonsContainer) return;

  suggestedButtonsContainer.innerHTML = SUGGESTED_QUESTIONS.map(q => `
    <button type="button" class="suggested-btn" data-question="${q}">
      ${q}
    </button>
  `).join('');

  suggestedButtonsContainer.querySelectorAll('.suggested-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const q = e.currentTarget.getAttribute('data-question');
      handleUserQuery(q);
    });
  });
}

/**
 * Check if the input text is a Turkish greeting
 */
function isGreeting(text) {
  const t = text.toLowerCase().trim();
  const clean = t.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"!]/g, '').trim();

  const greetingWords = [
    'naber', 'ne haber', "n'aber", 'naber nasilsin', 'naber nasılsın',
    'merhaba', 'merhabalar', 'meraba',
    'selam', 'selamlar', 'slm',
    'günaydın', 'gunaydin',
    'iyi günler', 'iyi gunler',
    'iyi akşamlar', 'iyi aksamlar',
    'nasılsın', 'nasilsin',
    'hey', 'sa', 'as', 'selamun aleykum', 'aleykum selam'
  ];

  return greetingWords.some(w => clean === w || clean.startsWith(w + ' ') || clean.endsWith(' ' + w) || clean.includes(' ' + w + ' '));
}



const STOCK_NAME_STOP_WORDS = new Set(['anonim', 'sirketi', 'sanayi', 'ticaret', 'holding', 'as', 'grubu', 'turkiye', 'turk', 've', 'fabrikalari', 'yatirim', 'ortakligi', 'uzun', 'kisa', 'vade', 'vadeli', 'analiz', 'hisse', 'hissesi', 'fiyat', 'hareket', 'durum', 'yorum', 'bugun', 'nasil', 'icin', 'mi', 'ne']);

function findMentionedStocks(question) {
  const tokens = new Set(normalizeTurkish(question).split(' ').filter(Boolean));
  const exactCodes = BIST_STOCKS.filter(stock => tokens.has(normalizeTurkish(stock.code)));
  if (exactCodes.length) return exactCodes.slice(0, 3);

  const tokenFrequency = new Map();
  for (const stock of BIST_STOCKS) {
    const uniqueNameTokens = new Set(normalizeTurkish(stock.name).split(' ').filter(token => token.length >= 3 && !STOCK_NAME_STOP_WORDS.has(token)));
    for (const token of uniqueNameTokens) tokenFrequency.set(token, (tokenFrequency.get(token) || 0) + 1);
  }
  return BIST_STOCKS.filter(stock => normalizeTurkish(stock.name).split(' ').some(token =>
    token.length >= 3 && !STOCK_NAME_STOP_WORDS.has(token) && tokenFrequency.get(token) === 1 && tokens.has(token)
  )).slice(0, 3);
}
async function handleUserQuery(questionText, extraContext = {}) {
  if (!questionText || !questionText.trim()) return;
  const cleanQuestion = questionText.trim();
  appendChatMessage('user', cleanQuestion);
  chatHistory.push({ role: 'user', content: cleanQuestion });
  const submitButton = document.getElementById('aiSubmitButton');
  if (submitButton) submitButton.disabled = true;
  appendChatMessage('assistant', 'Güncel piyasa ve haber bağlamı inceleniyor…', true);
  try {
    const mentionedStocks = findMentionedStocks(cleanQuestion);
    let stocksForAI = currentStock ? [currentStock] : [];
    let newsForAI = extraContext.news || currentNews.slice(0, 5);
    if (mentionedStocks.length) {
      const requestedTimeframe = /uzun vade|orta vade|ayl[ıi]k|1\s*ay/i.test(normalizeTurkish(cleanQuestion)) ? '1mo' : currentTimeframe;
      const fetched = await Promise.all(mentionedStocks.map(async stock => {
        const [marketResult, newsResult] = await Promise.allSettled([
          getJson(`/api/market?symbol=${encodeURIComponent(stock.code)}&timeframe=${encodeURIComponent(requestedTimeframe)}`),
          extraContext.news ? Promise.resolve({ items: extraContext.news }) : getJson(`/api/news?symbol=${encodeURIComponent(stock.code)}`)
        ]);
        const market = marketResult.status === 'fulfilled' ? marketResult.value : { symbol: stock.code, name: stock.name, candles: [] };
        const relatedNews = newsResult.status === 'fulfilled' ? (newsResult.value.items || []).map(item => ({ ...item, symbol: stock.code })) : [];
        return { market, relatedNews };
      }));
      stocksForAI = fetched.map(({ market }) => market);
      newsForAI = fetched.flatMap(({ relatedNews }) => relatedNews).slice(0, 5);
    }
    const context = {
      stocks: stocksForAI.map(stock => ({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        currency: stock.currency,
        changePercent: stock.changePercent,
        dayHigh: stock.dayHigh,
        dayLow: stock.dayLow,
        previousClose: stock.previousClose,
        volume: stock.volume,
        asOf: stock.asOf,
        timeframe: mentionedStocks.length ? (/uzun vade|orta vade|ayl[ıi]k|1\s*ay/i.test(normalizeTurkish(cleanQuestion)) ? '1mo' : currentTimeframe) : currentTimeframe,
        recentCandles: (stock.candles || []).slice(-12).map(({ timestamp, open, high, low, close, volume }) => ({ time: timestamp, open, high, low, close, volume }))
      })),
      requestedSymbols: mentionedStocks.map(stock => stock.code),
      news: newsForAI
    };
    const payload = await getJson('/api/assistant', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question: cleanQuestion, context, history: chatHistory.slice(-8, -1) })
    });
    removePendingMessage();
    appendChatMessage('assistant', payload.answer);
    chatHistory.push({ role: 'assistant', content: payload.answer });
    chatHistory = chatHistory.slice(-12);
  } catch (error) {
    removePendingMessage();
    appendChatMessage('assistant', error.message);
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function removePendingMessage() {
  chatContainer?.querySelector('.pending-message')?.remove();
}

/**
 * Append Message to Chat Container
 */
function appendChatMessage(sender, text, pending = false) {
  if (!chatContainer) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'assistant-message'}${pending ? ' pending-message' : ''}`;

  if (sender === 'user') {
    messageDiv.innerHTML = `
      <div class="message-meta">
        <span class="sender-name">Siz</span>
      </div>
      <p class="message-text">${escapeHtml(text)}</p>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-meta">
        <span class="sender-name">BIST AI Asistanı</span>
        <span class="demo-tag">Gemini yanıtı</span>
      </div>
      <p class="message-text">${escapeHtml(text)}</p>
    `;
  }

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Event Listeners Initialization
 */
function initEventListeners() {
  // Navigation Links
  initNavLinks();

  // AI Question Form Submit
  if (aiInputForm && aiQuestionInput) {
    aiInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = aiQuestionInput.value;
      if (question.trim()) {
        handleUserQuery(question);
        aiQuestionInput.value = '';
      }
    });
  }

  // Quick Chips Click Event
  if (chipsList) {
    chipsList.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-button');
      if (btn) {
        const symbol = btn.getAttribute('data-symbol');
        if (symbol) {
          selectStock(symbol);
        }
      }
    });
  }

  // Chart View Toggle (Basit / Detaylı)
  const viewButtons = document.querySelectorAll('.chart-view-btn');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      viewButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentViewMode = btn.getAttribute('data-view') || 'basit';
      renderActiveChart();
    });
  });

  // Timeframe buttons (1G, 1H, 1A)
  const timeframeButtons = document.querySelectorAll('.timeframe-btn');
  timeframeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeframeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTimeframe = btn.getAttribute('data-timeframe');
      updateStockDisplay(currentStockKey);
    });
  });

  // Stock Search Input Events (Turkish-aware, accent-insensitive autocomplete)
  if (stockSearchInput) {
    stockSearchInput.addEventListener('input', (e) => {
      renderAutocompleteResults(e.target.value);
    });

    stockSearchInput.addEventListener('keydown', (e) => {
      if (!stockAutocompleteList || stockAutocompleteList.classList.contains('hidden')) {
        if (e.key === 'ArrowDown' && stockSearchInput.value.trim()) {
          renderAutocompleteResults(stockSearchInput.value);
          e.preventDefault();
        }
        return;
      }

      const items = stockAutocompleteList.querySelectorAll('[role="option"]');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeDropdownIndex = (activeDropdownIndex + 1) % items.length;
        updateActiveDropdownHighlight();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeDropdownIndex = activeDropdownIndex <= 0 ? items.length - 1 : activeDropdownIndex - 1;
        updateActiveDropdownHighlight();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        hideAutocomplete();
      } else if (e.key === 'Enter') {
        // If an option is active in the dropdown, select it
        if (activeDropdownIndex >= 0 && items[activeDropdownIndex]) {
          e.preventDefault();
          const targetItem = items[activeDropdownIndex];
          const code = targetItem.getAttribute('data-code');
          const name = targetItem.getAttribute('data-name');
          selectStock(code, name);
        }
      }
    });
  }

  // Click on autocomplete dropdown item
  if (stockAutocompleteList) {
    stockAutocompleteList.addEventListener('mousedown', (e) => {
      // Prevent input blur before click registers
      e.preventDefault();
    });

    stockAutocompleteList.addEventListener('click', (e) => {
      const item = e.target.closest('[role="option"]');
      if (item) {
        const code = item.getAttribute('data-code');
        const name = item.getAttribute('data-name');
        selectStock(code, name);
      }
    });
  }

  // Hide autocomplete when clicking outside
  document.addEventListener('click', (e) => {
    if (stockSearchForm && !stockSearchForm.contains(e.target)) {
      hideAutocomplete();
    }
  });

  // Stock Search Form Submit
  if (stockSearchForm && stockSearchInput) {
    stockSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = stockSearchInput.value.trim();
      if (!query) return;

      // 1. If dropdown item is highlighted, select it
      if (stockAutocompleteList && !stockAutocompleteList.classList.contains('hidden')) {
        const items = stockAutocompleteList.querySelectorAll('[role="option"]');
        if (activeDropdownIndex >= 0 && items[activeDropdownIndex]) {
          const item = items[activeDropdownIndex];
          selectStock(item.getAttribute('data-code'), item.getAttribute('data-name'));
          return;
        }
      }

      // 2. Check exact code match in the supported BIST symbol list
      const norm = normalizeTurkish(query);
      const exactStock = BIST_STOCKS.find(s => normalizeTurkish(s.code) === norm);
      if (exactStock) {
        selectStock(exactStock.code, exactStock.name);
        return;
      }

      // 3. Check search results
      const matches = searchStocks(query, 1);
      if (matches.length > 0) {
        selectStock(matches[0].code, matches[0].name);
        return;
      }

      // 4. Fallback: select typed code
      const cleanCode = query.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ]/g, '').toUpperCase() || query.toUpperCase();
      selectStock(cleanCode, cleanCode);
    });
  }
}

/**
 * App Bootstrapper
 */
function initApp() {
  initThemeSwitcher();
  renderTicker();
  renderChips();
  renderNews(currentStockKey);
  renderSuggestedQuestions();
  updateStockDisplay(currentStockKey);
  initEventListeners();
  window.setInterval(() => {
    renderTicker();
    updateStockDisplay(currentStockKey);
    renderNews(currentStockKey);
  }, 5 * 60 * 1000);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
