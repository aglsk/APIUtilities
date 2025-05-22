import { readFile } from 'fs/promises';
import path from 'path';

let nomesMasculinos = [];
let nomesFemininos = [];

async function carregarNomes() {
  if (nomesMasculinos.length && nomesFemininos.length) return;

  try {
    const basePath = path.resolve(process.cwd(), 'api', 'identificador_genero');

    const masc = await readFile(path.join(basePath, 'masculino.txt'), 'utf8');
    const fem = await readFile(path.join(basePath, 'feminino.txt'), 'utf8');

    nomesMasculinos = masc
      .split('\n')
      .map(n => n.trim().toLowerCase())
      .filter(Boolean);

    nomesFemininos = fem
      .split('\n')
      .map(n => n.trim().toLowerCase())
      .filter(Boolean);
  } catch (err) {
    console.error('Erro ao carregar arquivos:', err.message);
  }
}

export default async function handler(req, res) {
  const nome = (req.query.nome || '').toLowerCase().trim();

  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  await carregarNomes();

  if (nomesMasculinos.includes(nome)) {
    return res.status(200).json({ nome, genero: 'masculino' });
  }

  if (nomesFemininos.includes(nome)) {
    return res.status(200).json({ nome, genero: 'feminino' });
  }

  return res.status(200).json({ nome, genero: 'desconhecido' });
}
