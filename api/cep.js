app.get('/cep/:cep', async (req, res) => {
  const cep = req.params.cep.replace(/\D/g, '');
  if (!cep) return res.status(400).json({ erro: 'CEP não informado' });

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      return res.status(404).json({ erro: 'CEP não encontrado' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao consultar o CEP' });
  }
});
