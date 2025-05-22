// pages/api/classificacao.js

export default async function handler(req, res) {
  const leagueId = '4351'; // ID da Série A no TheSportsDB
  const season = '2025';   // Temporada atual
  const apiKey = '3';      // Chave de API gratuita para testes

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
