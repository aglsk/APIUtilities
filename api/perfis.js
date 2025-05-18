export default function handler(req, res) {
  const nome = req.query.nome || 'Convidado';

  // Avatar único por nome
  const avatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(nome)}`;

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
