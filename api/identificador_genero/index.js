const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let nomesMasculinos = [];
let nomesFemininos = [];

// Função para carregar os nomes dos arquivos
function carregarNomes() {
  try {
    nomesMasculinos = fs.readFileSync('masculino.txt', 'utf-8')
      .split('\n')
      .map(n => n.trim().toLowerCase())
      .filter(n => n.length > 0);

    nomesFemininos = fs.readFileSync('feminino.txt', 'utf-8')
      .split('\n')
      .map(n => n.trim().toLowerCase())
      .filter(n => n.length > 0);

    console.log('Nomes carregados com sucesso.');
  } catch (err) {
    console.error('Erro ao carregar os arquivos:', err.message);
  }
}

carregarNomes();

app.get('/api/genero', (req, res) => {
  const nome = (req.query.nome || '').toLowerCase().trim();

  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  if (nomesMasculinos.includes(nome)) {
    return res.json({ nome, genero: 'masculino' });
  }

  if (nomesFemininos.includes(nome)) {
    return res.json({ nome, genero: 'feminino' });
  }

  return res.json({ nome, genero: 'desconhecido' });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
