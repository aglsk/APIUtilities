import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://ge.globo.com/agenda/');
    const $ = cheerio.load(data);

    const jogos = [];

    $('.card-agenda').each((i, el) => {
      const dataHora = $(el).find('.card-agenda__info__date').text().trim();

      const timeA = $(el).find('.team-name__content').eq(0).text().trim();
      const timeB = $(el).find('.team-name__content').eq(1).text().trim();

      const local = $(el).find('.card-agenda__info__location').text().trim();

      jogos.push({
        dataHora,
        timeA,
        timeB,
        local
      });
    });

    res.status(200).json({ jogos });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agenda' });
  }
}
