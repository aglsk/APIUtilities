const axios = require('axios');

module.exports = async (req, res) => {
  const { de = 'USD', para = 'BRL', valor = 1 } = req.query;

  try {
    const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${de}-${para}`);
    const data = response.data[`${de}${para}`];

    const convertido = parseFloat(valor) * parseFloat(data.bid);
    res.status(200).json({
      de,
      para,
      valor: Number(valor),
      cotacao: parseFloat(data.bid),
      convertido: convertido.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ erro: 'Falha ao obter cotação', detalhes: err.message });
  }
};
