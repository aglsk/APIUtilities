const axios = require('axios');

module.exports = async (req, res) => {
  const { cep } = req.query;

  if (!cep) {
    return res.status(400).json({ error: 'CEP não informado' });
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      return res.status(404).json({ error: 'CEP não encontrado' });
    }

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar o CEP' });
  }
};
