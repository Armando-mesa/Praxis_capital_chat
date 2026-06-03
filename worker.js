export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Proxy para la API de Anthropic
    if (url.pathname === '/api/chat') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        });
      }

      const body = await request.json();

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         // 'x-api-key': env.ANTHROPIC_API_KEY,
          'x-api-key': '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',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Para el resto de rutas sirve los assets estáticos
    return env.ASSETS.fetch(request);
  }
};
