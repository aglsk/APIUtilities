const express = require('express');
const axios = require('axios');
const app = express();

app.get('/cep', async (req, res) => {
  const cep = req.query.cep;

  if (!cep) {
    return res.status(400).json({ error: 'CEP não informado' });
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      return res.status(404).json({ error: 'CEP não encontrado' });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar o CEP' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
