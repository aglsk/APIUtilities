const axios = require('axios');

export default async function handler(req, res) {
  const { de, para, valor } = req.query;

  if (!de || !para || !valor || isNaN(valor)) {
    return res.status(400).json({ erro: 'Parâmetros inválidos. Use: /conversor?de=USD&para=BRL&valor=10' });
  }

  try {
    const response = await axios.get('https://api.exchangerate.host/convert', {
      params: {
        from: de.toUpperCase(),
        to: para.toUpperCase(),
        amount: valor
      }
    });

    const data = response.data;

    if (!data.success) {
      return res.status(500).json({ erro: 'Erro na conversão de moeda.' });
    }

    res.status(200).json({
      de: data.query.from,
      para: data.query.to,
      valor: data.query.amount,
      convertido: data.result,
      taxa: data.info.rate,
      data: data.date
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao acessar a API.', detalhes: error.message });
  }
  }
