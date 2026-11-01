import {
  TICKER_ITEMS,
  DEMO_STOCKS,
  DEMO_NEWS,
  SUGGESTED_QUESTIONS,
  CANNED_AI_RESPONSES
} from './data/demo.js';

// State
let currentStockKey = 'THYAO';
let currentTimeframe = '1G';

// DOM Elements
const tickerContainer = document.getElementById('tickerItemsContainer');
const newsListContainer = document.getElementById('newsListContainer');
const suggestedButtonsContainer = document.getElementById('suggestedButtonsContainer');
const chatContainer = document.getElementById('chatContainer');
const aiInputForm = document.getElementById('aiInputForm');
const aiQuestionInput = document.getElementById('aiQuestionInput');
const stockSearchForm = document.getElementById('stockSearchForm');
const stockSearchInput = document.getElementById('stockSearchInput');
const chipsList = document.getElementById('chipsList');
const svgChartContainer = document.getElementById('svgChartContainer');
const chartTooltip = document.getElementById('chartTooltip');

// Stock details DOM elements
const stockSymbolDisplay = document.getElementById('stockSymbolDisplay');
const stockNameDisplay = document.getElementById('stockNameDisplay');
const stockPriceDisplay = document.getElementById('stockPriceDisplay');
const stockChangeDisplay = document.getElementById('stockChangeDisplay');
const stockSectorDisplay = document.getElementById('stockSectorDisplay');
const metricHigh = document.getElementById('metricHigh');
const metricLow = document.getElementById('metricLow');
const metricVolume = document.getElementById('metricVolume');
const metricPE = document.getElementById('metricPE');
const stockSummaryText = document.getElementById('stockSummaryText');

/**
 * Top Navigation Links Smooth Scroll & Panel Focus
 * Ensures all 4 links work reliably on both desktop and mobile
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
        void target.offsetWidth; // Force CSS reflow
        target.classList.add('panel-highlight');
        setTimeout(() => {
          target.classList.remove('panel-highlight');
        }, 1500);
      }
    });
  });
}

/**
 * Render Top Bar Ticker Items
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
  // Strip punctuation
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
      return `Demo yanıt: ${stock.symbol} (${stock.name}) hissesi ${stock.price} seviyesinde işlem görmekte olup günlük değişimi ${stock.change} yönündedir. Şirket özeti: ${stock.summary} Gün içi en düşük ${stock.dayLow}, en yüksek ise ${stock.dayHigh} olarak gerçekleşmiştir.`;
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

  // 1. Add User Message
  appendChatMessage('user', cleanQuestion);

  // 2. Simulate AI Thinking delay (200ms for responsive feel)
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
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Update Stock Display Details
 */
function updateStockDisplay(symbolKey) {
  const stock = DEMO_STOCKS[symbolKey] || DEMO_STOCKS.THYAO;
  currentStockKey = stock.symbol;

  // Title & Code
  if (stockSymbolDisplay) stockSymbolDisplay.textContent = stock.symbol;
  if (stockNameDisplay) stockNameDisplay.textContent = stock.name;

  // Price & Change
  if (stockPriceDisplay) stockPriceDisplay.textContent = stock.price;
  if (stockChangeDisplay) {
    stockChangeDisplay.className = `stock-change-pill ${stock.isUp ? 'up' : 'down'}`;
    stockChangeDisplay.innerHTML = `
      <span class="pill-arrow" aria-hidden="true">${stock.isUp ? '▲' : '▼'}</span>
      <span class="pill-text">${stock.change}</span>
    `;
  }

  if (stockSectorDisplay) stockSectorDisplay.textContent = stock.sector;
  if (metricHigh) metricHigh.textContent = stock.dayHigh;
  if (metricLow) metricLow.textContent = stock.dayLow;
  if (metricVolume) metricVolume.textContent = stock.volume;
  if (metricPE) metricPE.textContent = stock.peRatio;
  if (stockSummaryText) stockSummaryText.textContent = stock.summary;

  // Update quick chips active class & scroll selected chip into view
  if (chipsList) {
    chipsList.querySelectorAll('.chip-button').forEach(btn => {
      const match = btn.getAttribute('data-symbol') === stock.symbol;
      btn.classList.toggle('active', match);
      if (match) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    });
  }

  // Render SVG Chart for current timeframe
  renderSvgChart(stock, currentTimeframe);
}

/**
 * Render Interactive Inline SVG Chart
 * Pure SVG mathematical projection with hover crosshair and tooltips
 */
function renderSvgChart(stock, timeframe) {
  if (!svgChartContainer) return;

  const series = stock.series[timeframe] || stock.series['1G'];
  const values = series.map(d => d.value);

  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.12 || 1;
  const domainMin = minVal - padding;
  const domainMax = maxVal + padding;

  const width = 600;
  const height = 240;
  const padLeft = 55;
  const padRight = 20;
  const padTop = 25;
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
  const gridSteps = 3;
  let gridLinesHtml = '';
  for (let s = 0; s <= gridSteps; s++) {
    const val = domainMin + (s / gridSteps) * (domainMax - domainMin);
    const yPos = getY(val);
    gridLinesHtml += `
      <line x1="${padLeft}" y1="${yPos}" x2="${width - padRight}" y2="${yPos}" stroke="#1E2C4A" stroke-dasharray="3 3" stroke-width="1" />
      <text x="${padLeft - 8}" y="${yPos + 4}" fill="#64748B" font-size="10" text-anchor="end" font-family="sans-serif">${val.toFixed(2)}</text>
    `;
  }

  // X-axis labels
  const xLabelsHtml = points.map(pt => `
    <text x="${pt.x}" y="${height - 10}" fill="#94A3B8" font-size="10" text-anchor="middle" font-family="sans-serif">${pt.label}</text>
  `).join('');

  // Interactive Hover Dots
  const dotsHtml = points.map((pt, i) => `
    <circle 
      cx="${pt.x}" 
      cy="${pt.y}" 
      r="4" 
      fill="${strokeColor}" 
      stroke="#0B1426" 
      stroke-width="2" 
      class="chart-point" 
      data-index="${i}"
      tabindex="0"
      role="button"
      aria-label="${pt.label}: ${pt.value.toFixed(2)} TL"
    />
  `).join('');

  const svgContent = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="market-svg">
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
        chartTooltip.innerHTML = `<strong>${pt.label}</strong>: ${pt.value.toFixed(2)} TL <span class="demo-tag">Demo</span>`;
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

  // Stock Search Form
  if (stockSearchForm && stockSearchInput) {
    stockSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = stockSearchInput.value.trim().toUpperCase();
      if (!query) return;

      if (DEMO_STOCKS[query]) {
        updateStockDisplay(query);
        stockSearchInput.value = '';

        // If on small screen, smoothly scroll down to chart
        if (window.innerWidth <= 1080) {
          const chartSection = document.getElementById('grafik');
          if (chartSection) {
            const header = document.querySelector('.top-bar');
            const headerHeight = header ? header.offsetHeight : 70;
            const targetTop = chartSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
            window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
          }
        }
      } else {
        alert(`"${query}" kodu demo listesinde bulunamadı.\n\nLütfen mevcut 20 hisseden birini arayın: ${Object.keys(DEMO_STOCKS).join(', ')}`);
      }
    });
  }

  // Quick Chips Click Event
  if (chipsList) {
    chipsList.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-button');
      if (btn) {
        const symbol = btn.getAttribute('data-symbol');
        if (symbol && DEMO_STOCKS[symbol]) {
          updateStockDisplay(symbol);
        }
      }
    });
  }

  // Timeframe buttons
  const timeframeButtons = document.querySelectorAll('.timeframe-btn');
  timeframeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeframeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTimeframe = btn.getAttribute('data-timeframe');
      const stock = DEMO_STOCKS[currentStockKey] || DEMO_STOCKS.THYAO;
      renderSvgChart(stock, currentTimeframe);
    });
  });
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
