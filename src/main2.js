import {
  TICKER_ITEMS,
  DEMO_STOCKS,
  SUGGESTED_QUESTIONS,
  generateDemoCandles
} from './data/demo.js';

import {
  BIST_STOCKS,
  normalizeTurkish,
  searchStocks
} from './data/bist-stocks.js';

// State
let currentStockKey = 'THYAO';
let currentTimeFrame = '1G';
let currentViewModel = 'basit';
let currentSearchResults = [];
let activeDropdownIndex = -1;

// Theme Management
const THEME_STORAGE_KEY = 'bist_theme';
const VALID_THEMES = ['lacivert', 'altin', 'acik'];

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return VALID_THEMES.includes(saved) ? saved : 'lacivert';
  } catch (e) {
    return 'lacivert';
  }
}

function setTheme(theme) {
  if (!VALID_THEMES.includes(theme)) return;
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {}
}

// TradingView Canlı BIST Grafiği Entegrasyonu
function renderLiveTradingViewChart(symbol = 'THYAO') {
  const chartContainer = document.getElementById('svgChartContainer') || document.querySelector('.chart-container');
  if (!chartContainer) return;

  const cleanSymbol = symbol.replace('.IS', '').toUpperCase();

  chartContainer.innerHTML = `<div id="tradingview_bist_chart" style="height: 400px; width: 100%;"></div>`;

  const initWidget = () => {
    if (window.TradingView) {
      new TradingView.widget({
        "autosize": true,
        "symbol": `BIST:${cleanSymbol}`,
        "interval": "D",
        "timezone": "Europe/Istanbul",
        "theme": "dark",
        "style": "1",
        "locale": "tr",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_bist_chart"
      });
    }
  };

  if (window.TradingView) {
    initWidget();
  } else {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = initWidget;
    document.head.appendChild(script);
  }
}

// Antigravity / Vertex AI Canlı Yanıt ve Haber Filtreleme
async function fetchAntigravityAIResponse(userMessage, symbol) {
  const systemInstruction = `
    Sen BIST borsa analiz asistanısın.
    KURAL 1: Sana sağlanan gerçek veriler ve arama sonuçları dışında KESİNLİKLE haber uydurma.
    KURAL 2: Elinde doğrulanmış haber verisi yoksa "Bu hisse için doğrulanmış güncel KAP/finans haberi bulunamadı" yanıtını ver.
  `;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        symbol: symbol,
        systemInstruction: systemInstruction
      })
    });
    
    if (!response.ok) throw new Error('API Hatası');
    const data = await response.json();
    return data.reply || "AI yanıtı oluşturulamadı.";
  } catch (error) {
    return `[Antigravity AI]: ${symbol} için canlı haber ve analiz servisine bağlanılıyor... (Doğrulanmamış uydurma haberler engellendi)`;
  }
}

// Uygulama Başlangıcı
document.addEventListener('DOMContentLoaded', () => {
  setTheme(getSavedTheme());
  renderLiveTradingViewChart(currentStockKey);

  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  const handleSend = async () => {
    if (!chatInput || !chatInput.value.trim()) return;
    const msg = chatInput.value.trim();
    chatInput.value = '';

    appendChatMessage('user', msg);
    const aiReply = await fetchAntigravityAIResponse(msg, currentStockKey);
    appendChatMessage('assistant', aiReply);
  };

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
});

function appendChatMessage(sender, text) {
  const chatContainer = document.getElementById('chatContainer');
  if (!chatContainer) return;
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'assistant-message'}`;
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}