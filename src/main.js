import {
  TICKER_ITEMS,
  DEMO_STOCKS,
  DEMO_NEWS,
  SUGGESTED_QUESTIONS,
  CANNED_AI_RESPONSES,
  generateDemoCandles
} from './data/demo.js';

import {
  BIST_STOCKS,
  normalizeTurkish,
  searchStocks
} from './data/bist-stocks.js';

// State
let currentStockKey = 'THYAO';
let currentTimeframe = '1G';
let currentViewMode = 'basit'; // 'basit' | 'detayli'
let currentSearchResults = [];
let activeDropdownIndex = -1;

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

/**
 * Render Top Bar Ticker Items (Demo)
 */
function renderTicker() {
  if (!tickerContainer) return;

  tickerContainer.innerHTML = TICKER_ITEMS.map(item => `
    <div class="ticker-item" title="${item.name} (Demo Veri)">
      <span class="ticker-name">${item.name}:</span>
      <span class="ticker-val">${item.value}</span>
      <span class="ticker-chg ${item.isUp ? 'up' : 'down'}">
        ${item.isUp ? '▲' : '▼'} ${item.change}
      </span>
    </div>
  `).join('');
}

/**
 * Render 20 Quick Chips from DEMO_STOCKS
 */
function renderChips() {
  if (!chipsList) return;

  const stockKeys = Object.keys(DEMO_STOCKS);
  chipsList.innerHTML = stockKeys.map(key => {
    const stock = DEMO_STOCKS[key];
    const isActive = stock.symbol === currentStockKey;
    return `
      <button 
        type="button" 
        class="chip-button ${isActive ? 'active' : ''}" 
        data-symbol="${stock.symbol}"
        title="${stock.symbol} - ${stock.name} (${stock.price})"
      >
        ${stock.symbol}
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
  const stock = DEMO_STOCKS[currentStockKey];
  if (!stock) return;

  if (currentViewMode === 'detayli') {
    renderCandleChart(stock, currentTimeframe);
  } else {
    renderSvgChart(stock, currentTimeframe);
  }

  // Update screen reader text summary
  if (chartScreenReaderSummary) {
    chartScreenReaderSummary.textContent = `${stock.symbol} (${stock.name}) için ${currentTimeframe} dönemine ait ${currentViewMode === 'detayli' ? 'detaylı mum grafiği' : 'çizgi grafiği'}. Son fiyat ${stock.price}, değişim ${stock.change}. Demo veri.`;
  }
}

/**
 * Update Stock Display in Center Panel
 * Shows full demo chart, stats & note if stock has demo data.
 * Shows clear Turkish no-data card if stock has no demo data. Never invents prices.
 */
function updateStockDisplay(symbolKey, customName) {
  if (!symbolKey) return;
  const rawKey = symbolKey.trim().toUpperCase();
  currentStockKey = rawKey;

  const demoStock = DEMO_STOCKS[rawKey];

  if (demoStock) {
    // ----------------- HAS DEMO DATA -----------------
    if (stockSymbolDisplay) stockSymbolDisplay.textContent = demoStock.symbol;
    if (stockNameDisplay) stockNameDisplay.textContent = demoStock.name;
    if (stockDemoBadge) stockDemoBadge.classList.remove('hidden');

    if (stockPriceContainer) stockPriceContainer.classList.remove('hidden');
    if (stockPriceDisplay) stockPriceDisplay.textContent = demoStock.price;
    if (stockChangeDisplay) {
      stockChangeDisplay.className = `stock-change-pill ${demoStock.isUp ? 'up' : 'down'}`;
      stockChangeDisplay.innerHTML = `
        <span class="pill-arrow" aria-hidden="true">${demoStock.isUp ? '▲' : '▼'}</span>
        <span class="pill-text">${demoStock.change}</span>
      `;
    }
    if (stockSectorDisplay) stockSectorDisplay.textContent = demoStock.sector;

    if (chartControlsWrap) chartControlsWrap.classList.remove('hidden');
    if (timeframeSelector) timeframeSelector.classList.remove('hidden');
    if (chartViewToggle) chartViewToggle.classList.remove('hidden');
    if (chartWrapper) chartWrapper.classList.remove('hidden');
    if (noDataCard) noDataCard.classList.add('hidden');

    if (metricsGrid) metricsGrid.classList.remove('hidden');
    if (metricHigh) metricHigh.textContent = demoStock.dayHigh;
    if (metricLow) metricLow.textContent = demoStock.dayLow;
    if (metricVolume) metricVolume.textContent = demoStock.volume;
    if (metricPE) metricPE.textContent = demoStock.peRatio;

    if (stockNoteCard) stockNoteCard.classList.remove('hidden');
    if (stockSummaryText) stockSummaryText.textContent = demoStock.summary;

    updateActiveChip(demoStock.symbol);
    renderActiveChart();

  } else {
    // ----------------- NO DEMO DATA -----------------
    let displayName = customName;
    if (!displayName) {
      const found = BIST_STOCKS.find(s => s.code.toUpperCase() === rawKey);
      displayName = found ? found.name : 'Borsa İstanbul Şirketi';
    }

    if (stockSymbolDisplay) stockSymbolDisplay.textContent = rawKey;
    if (stockNameDisplay) stockNameDisplay.textContent = displayName;

    // Never invent prices: hide demo badges, price, timeframe, metrics, and note
    if (stockDemoBadge) stockDemoBadge.classList.add('hidden');
    if (stockPriceContainer) stockPriceContainer.classList.add('hidden');
    if (timeframeSelector) timeframeSelector.classList.add('hidden');

    if (chartWrapper) chartWrapper.classList.add('hidden');
    if (noDataCard) {
      noDataCard.classList.remove('hidden');
      if (noDataStockTitle) {
        noDataStockTitle.textContent = `${rawKey} - ${displayName}`;
      }
    }

    if (metricsGrid) metricsGrid.classList.add('hidden');
    if (stockNoteCard) stockNoteCard.classList.add('hidden');

    updateActiveChip(rawKey);
  }
}

/**
 * Render Interactive Inline SVG Chart (Basit Görünüm)
 * Pure SVG mathematical projection with hover crosshair and tooltips
 */
function renderSvgChart(stock, timeframe) {
  if (!svgChartContainer) return;

  svgChartContainer.setAttribute('aria-label', `${stock.symbol} ${timeframe} Çizgi Fiyat Grafiği (Demo Veri)`);

  const series = stock.series[timeframe] || stock.series['1G'];
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

  // Colors based on trend
  const strokeColor = stock.isUp ? '#22C55E' : '#EF4444';
  const gradStop1 = stock.isUp ? 'rgba(34, 197, 94, 0.35)' : 'rgba(239, 68, 68, 0.35)';
  const gradStop2 = 'rgba(11, 20, 38, 0.0)';

  // 4 Horizontal Grid Lines
  const gridSteps = 4;
  let gridLinesHtml = '';
  for (let s = 0; s <= gridSteps; s++) {
    const val = domainMin + (s / gridSteps) * (domainMax - domainMin);
    const yPos = getY(val);
    gridLinesHtml += `
      <line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="#1E2C4A" stroke-dasharray="3 3" stroke-width="1" />
      <text x="${padLeft - 8}" y="${(yPos + 4).toFixed(1)}" fill="#64748B" font-size="10" text-anchor="end" font-family="sans-serif">${val.toFixed(2)}</text>
    `;
  }

  // X-axis labels
  const xLabelsHtml = points.map(pt => `
    <text x="${pt.x.toFixed(1)}" y="${height - 10}" fill="#94A3B8" font-size="10" text-anchor="middle" font-family="sans-serif">${pt.label}</text>
  `).join('');

  // Interactive Hover Dots
  const dotsHtml = points.map((pt, i) => `
    <circle 
      cx="${pt.x.toFixed(1)}" 
      cy="${pt.y.toFixed(1)}" 
      r="4.5" 
      fill="${strokeColor}" 
      stroke="#0B1426" 
      stroke-width="2" 
      class="chart-point" 
      data-index="${i}"
      tabindex="0"
      role="button"
      aria-label="${pt.label}: ${pt.value.toFixed(2)} TL (Demo Veri)"
    />
  `).join('');

  const svgContent = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="market-svg" aria-hidden="true">
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${gradStop1}" />
          <stop offset="100%" stop-color="${gradStop2}" />
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
            <span class="demo-tag">Demo veri</span>
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

  svgChartContainer.setAttribute('aria-label', `${stock.symbol} ${timeframe} Detaylı Mum Grafiği (Demo Veri)`);

  const candles = (stock.candles && stock.candles[timeframe]) || generateDemoCandles(stock.symbol, stock.rawPrice, timeframe);

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
      <line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="#1E2C4A" stroke-dasharray="3 3" stroke-width="1" />
      <text x="${padLeft - 8}" y="${(yPos + 3.5).toFixed(1)}" fill="#64748B" font-size="10" text-anchor="end" font-family="sans-serif">${val.toFixed(2)}</text>
    `;
  }

  // Volume separator & label
  const volSeparatorHtml = `
    <line x1="${padLeft}" y1="${volTop - 4}" x2="${width - padRight}" y2="${volTop - 4}" stroke="#1E2C4A" stroke-width="1" />
    <text x="${padLeft - 8}" y="${volTop + 10}" fill="#64748B" font-size="9" text-anchor="end" font-family="sans-serif">Hacim</text>
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
  const xLabelsHtml = candles.map((c, i) => `
    <text x="${getX(i).toFixed(1)}" y="${height - 10}" fill="#94A3B8" font-size="9" text-anchor="middle" font-family="sans-serif">${c.label}</text>
  `).join('');

  // Candlesticks and Volume Bars
  const candlesHtml = candles.map((c, i) => {
    const cx = getX(i);
    const isUp = c.isUp;
    const color = isUp ? '#22C55E' : '#EF4444';
    const vColor = isUp ? 'rgba(34, 197, 94, 0.45)' : 'rgba(239, 68, 68, 0.45)';
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
        aria-label="${c.label}: Açılış ${c.open.toFixed(2)} TL, Yüksek ${c.high.toFixed(2)} TL, Düşük ${c.low.toFixed(2)} TL, Kapanış ${c.close.toFixed(2)} TL, Hacim ${c.volume.toLocaleString('tr-TR')} Lot (Demo Veri)"
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
        <circle cx="55" cy="14" r="3.5" fill="#38BDF8" />
        <text x="63" y="17" fill="#94A3B8" font-size="9.5" font-family="sans-serif">HO(5) Hareketli Ortalama</text>
        <rect x="200" y="10.5" width="7" height="7" fill="#22C55E" rx="1" />
        <text x="211" y="17" fill="#94A3B8" font-size="9.5" font-family="sans-serif">Yükseliş</text>
        <rect x="260" y="10.5" width="7" height="7" fill="#EF4444" rx="1" />
        <text x="271" y="17" fill="#94A3B8" font-size="9.5" font-family="sans-serif">Düşüş</text>
      </g>

      <!-- Horizontal Price Grid Lines -->
      ${gridLinesHtml}

      <!-- Volume separator -->
      ${volSeparatorHtml}

      <!-- Moving Average Line -->
      <path d="${maPathD}" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

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
          <span class="demo-tag">Demo veri</span>
        </div>
        <div class="tooltip-grid">
          <div class="tooltip-row"><span>Açılış:</span> <strong>${c.open.toFixed(2)} TL</strong></div>
          <div class="tooltip-row"><span>Yüksek:</span> <strong>${c.high.toFixed(2)} TL</strong></div>
          <div class="tooltip-row"><span>Düşük:</span> <strong>${c.low.toFixed(2)} TL</strong></div>
          <div class="tooltip-row"><span>Kapanış:</span> <strong style="color:${isUp ? '#22C55E' : '#EF4444'}">${c.close.toFixed(2)} TL (${chgSign}%${chgPct})</strong></div>
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

/**
 * Render News List (6 Demo Items - No Images)
 */
function renderNews() {
  if (!newsListContainer) return;

  newsListContainer.innerHTML = DEMO_NEWS.map(item => `
    <li class="news-item">
      <div class="news-meta-row">
        <span class="news-category">${item.category}</span>
        <time class="news-time">${item.time}</time>
      </div>
      <p class="news-title">${item.title}</p>
      <div class="news-actions">
        <button type="button" class="news-ask-ai-btn" data-news-title="${item.title}" aria-label="Bu haberi yapay zekaya sor">
          <span>AI'ya Sor</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </li>
  `).join('');

  // Attach click listeners to "AI'ya Sor" inside news cards
  newsListContainer.querySelectorAll('.news-ask-ai-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const title = e.currentTarget.getAttribute('data-news-title');
      handleUserQuery(`Bu haberin piyasaya etkisi nedir: "${title}"`);

      // Smooth scroll to AI Assistant panel
      const aiPanel = document.getElementById('ai-asistan');
      if (aiPanel) {
        const header = document.querySelector('.top-bar');
        const headerHeight = header ? header.offsetHeight : 70;
        const targetTop = aiPanel.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        aiPanel.classList.remove('panel-highlight');
        void aiPanel.offsetWidth;
        aiPanel.classList.add('panel-highlight');
        setTimeout(() => aiPanel.classList.remove('panel-highlight'), 1500);
      }
    });
  });
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

/**
 * Match a canned response based on input query
 */
function getCannedResponse(query) {
  const q = query.toLowerCase().trim();

  // 1. Check for greetings
  if (isGreeting(q)) {
    return CANNED_AI_RESPONSES.greeting;
  }

  // 2. Check for specific stocks in DEMO_STOCKS
  for (const symbolKey of Object.keys(DEMO_STOCKS)) {
    const stock = DEMO_STOCKS[symbolKey];
    const lowerSymbol = symbolKey.toLowerCase();
    const lowerName = stock.name.toLowerCase();

    if (q.includes(lowerSymbol) || q.includes(lowerName)) {
      if (CANNED_AI_RESPONSES[lowerSymbol]) {
        return CANNED_AI_RESPONSES[lowerSymbol];
      }
      return `Demo yanıt: ${stock.symbol} (${stock.name}) hissesi demo portföyümüzde incelenmektedir. Şirket özeti: ${stock.summary}`;
    }
  }

  // 3. Check for general market / BIST 100 keywords
  if (q.includes('bist') || q.includes('endeks') || q.includes('piyasa') || q.includes('borsa')) {
    return CANNED_AI_RESPONSES.bist100;
  }

  // 4. Check for macro / news keywords
  if (q.includes('gelişme') || q.includes('gelisme') || q.includes('haber') || q.includes('tcmb') || q.includes('faiz') || q.includes('enflasyon')) {
    return CANNED_AI_RESPONSES.gelismeler;
  }

  // 5. Friendly fallback when question matches nothing
  return CANNED_AI_RESPONSES.fallback;
}

/**
 * Handle User Query in AI Assistant
 */
function handleUserQuery(questionText) {
  if (!questionText || !questionText.trim()) return;
  const cleanQuestion = questionText.trim();

  appendChatMessage('user', cleanQuestion);

  const answerText = getCannedResponse(cleanQuestion);

  setTimeout(() => {
    appendChatMessage('assistant', answerText);
  }, 200);
}

/**
 * Append Message to Chat Container
 */
function appendChatMessage(sender, text) {
  if (!chatContainer) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'assistant-message'}`;

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
        <span class="demo-tag">Demo yanıt</span>
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
      renderActiveChart();
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

      // 2. Check exact code match in DEMO_STOCKS or BIST_STOCKS
      const norm = normalizeTurkish(query);
      const exactDemoKey = Object.keys(DEMO_STOCKS).find(k => normalizeTurkish(k) === norm);
      if (exactDemoKey) {
        selectStock(exactDemoKey, DEMO_STOCKS[exactDemoKey].name);
        return;
      }

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
  renderTicker();
  renderChips();
  renderNews();
  renderSuggestedQuestions();
  updateStockDisplay(currentStockKey);
  initEventListeners();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
