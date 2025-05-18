export default function handler(req, res) {
  const nome = req.query.nome || 'Convidado';

  const avataresNetflix = [
    'https://avatars.githubusercontent.com/u/1?v=4',
    'https://avatars.githubusercontent.com/u/2?v=4',
    'https://avatars.githubusercontent.com/u/3?v=4',
    'https://avatars.githubusercontent.com/u/4?v=4',
    'https://avatars.githubusercontent.com/u/5?v=4',
    'https://avatars.githubusercontent.com/u/6?v=4',
    'https://avatars.githubusercontent.com/u/7?v=4',
    'https://avatars.githubusercontent.com/u/8?v=4',
  ];

  // Seleção aleatória de avatar
  const avatar = avataresNetflix[Math.floor(Math.random() * avataresNetflix.length)];

  // Gera cor aleatória fixa baseada no nome
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
