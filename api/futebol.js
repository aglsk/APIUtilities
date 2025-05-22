// implementei um controle de taxs se não vai da pau no código.

const rateLimit = new Map();

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  const windowTime = 60 * 1000;
  const maxRequests = 10;

  if (!rateLimit.has(ip)) rateLimit.set(ip, []);
  const requests = rateLimit.get(ip).filter(ts => now - ts < windowTime);

  if (requests.length >= maxRequests) {
    return res.status(429).json({ error: 'Muitas requisições. Tente novamente mais tarde.' });
  }

  requests.push(now);
  rateLimit.set(ip, requests);

  const leagueId = '4351'; // Série A do Brasileirão
  const season = '2025';   // Temporada atual
  const apiKey = '3';      // API key

  const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/lookuptable.php?l=${leagueId}&s=${season}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.table) {
      return res.status(404).json({ error: 'Classificação não encontrada.' });
    }

    res.status(200).json(data.table);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da classificação.' });
  }
}
