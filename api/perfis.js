export default async function handler(req, res) {
  const nome = req.query.nome || 'Convidado';

  // Detectar gênero via API Genderize
  let genero = 'unknown';
  try {
    const response = await fetch(`https://api.genderize.io?name=${encodeURIComponent(nome)}`);
    const data = await response.json();
    genero = data.gender || 'unknown';
  } catch (e) {
    console.error('Erro ao detectar gênero:', e);
  }

  const avataresHomem = [
    'https://i.imgur.com/fPFQZP6.png',
    'https://i.imgur.com/xyYlCNi.png',
    'https://i.imgur.com/IiRIWTB.png',
    'https://i.imgur.com/bQYJ3j2.png',
    'https://i.imgur.com/U5Aima9.png',
    'https://i.imgur.com/XSzYJIX.png',
    'https://i.imgur.com/9nWtdiZ.png'
  ];

  const avataresMulher = [
    'https://i.imgur.com/ih6xvXa.png',
    'https://i.imgur.com/lliiZRp.png',
    'https://i.imgur.com/VoOgmDk.png',
    'https://i.imgur.com/03Toblf.png',
    'https://i.imgur.com/XTIFwVV.png',
    'https://i.imgur.com/Iki5qJq.png',
    'https://i.imgur.com/ht2hiNi.png',
    'https://i.imgur.com/3ZtRl1h.png',
    'https://i.imgur.com/kz2ALK1.png'
  ];

  // Escolher avatar com base no gênero
  let avatar = 'https://loodibee.com/wp-content/uploads/Netflix-avatar-12.png';
  if (genero === 'male') {
    avatar = avataresHomem[Math.floor(Math.random() * avataresHomem.length)];
  } else if (genero === 'female') {
    avatar = avataresMulher[Math.floor(Math.random() * avataresMulher.length)];
  }

  // Cor baseada no nome
  const hash = [...nome].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const cores = ['#FF5733', '#1E90FF', '#32CD32', '#FFD700', '#9B59B6', '#00CED1'];
  const cor = cores[hash % cores.length];

  res.status(200).json({
    id: 1,
    nome,
    genero,
    avatar,
    cor
  });
}
