const axios = require('axios');

const rateLimit = new Map(); // Armazena o IP e suas requisições
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000; // 1 minuto

module.exports = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();

  let info = rateLimit.get(ip);

  if (!info || now - info.timestamp > WINDOW_MS) {
    // Reinicia a contagem
    info = { count: 1, timestamp: now };
  } else {
    info.count++;
  }

  rateLimit.set(ip, info);

  if (info.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Limite de 10 requisições por minuto excedido.' });
  }

  const { de, para, valor } = req.query;

  if (!de || !para || !valor) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios: de, para, valor' });
  }

  try {
    const url = `https://economia.awesomeapi.com.br/last/${de}-${para}`;
    const response = await axios.get(url);
    const data = response.data[`${de}${para}`];

    if (!data) {
      return res.status(500).json({ error: 'Erro ao obter dados da API externa' });
    }

    const cotacao = parseFloat(data.bid);
    const convertido = (parseFloat(valor) * cotacao).toFixed(2);

    res.status(200).json({
      de,
      para,
      valor_original: valor,
      cotacao,
      valor_convertido: convertido
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar cotação', details: err.message });
  }
};
