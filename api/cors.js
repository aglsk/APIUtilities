export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).json({ error: 'URL obrigatória (use ?url=https://...)' });
    return;
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0' // previne bloqueios simples
      }
    });

    const data = await response.text(); // ou .json() se quiser forçar JSON

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/plain');

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar URL', detalhe: err.message });
  }
}
