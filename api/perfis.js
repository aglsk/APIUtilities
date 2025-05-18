export default function handler(req, res) {
  const nome = req.query.nome || 'Convidado';

  const avataresNetflix = [
    'https://i.imgur.com/1XU8FjG.png',
    'https://i.imgur.com/zR4I1VW.png',
    'https://i.imgur.com/AKfC1Fd.png',
    'https://i.imgur.com/Tf0lRVP.png',
    'https://i.imgur.com/oo3FzrP.png',
    'https://i.imgur.com/4x1vR8U.png',
    'https://i.imgur.com/xEj6Khh.png',
    'https://i.imgur.com/XUsxZRx.png',
  ];

  // Avatar aleatório
  const avatar = avataresNetflix[Math.floor(Math.random() * avataresNetflix.length)];

  // Cor baseada no nome
  const hash = [...nome].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const cores = ['#FF5733', '#1E90FF', '#32CD32', '#FFD700', '#9B59B6', '#00CED1'];
  const cor = cores[hash % cores.length];

  res.status(200).json({
    id: 1,
    nome,
    avatar,
    cor
  });
}
