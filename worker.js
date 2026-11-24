import assistantHandler from './api/assistant.js';
import marketHandler from './api/market.js';
import newsHandler from './api/news.js';

function createMockRes() {
  const headers = new Headers({ 'content-type': 'application/json; charset=utf-8' });
  let statusCode = 200;
  let body = '';
  return {
    setHeader(k, v) { headers.set(k, v); },
    status(code) { statusCode = code; return this; },
    json(data) { body = JSON.stringify(data); return this; },
    toResponse() { return new Response(body, { status: statusCode, headers }); }
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const routes = {
      '/api/assistant': assistantHandler,
      '/api/market': marketHandler,
      '/api/news': newsHandler
    };

    const handler = routes[url.pathname];
    if (handler) {
      let body = {};
      if (request.method === 'POST') {
        try { body = await request.json(); } catch {}
      }
      const mockReq = {
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        query: Object.fromEntries(url.searchParams.entries()),
        body,
        env
      };
      const mockRes = createMockRes();
      await handler(mockReq, mockRes);
      return mockRes.toResponse();
    }

    return env.ASSETS.fetch(request);
  }
};
