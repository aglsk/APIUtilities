import allowCors from './cors.js';

async function handler(req, res) {
  res.status(200).json({ mensagem: 'CORS funcionando!' });
}

export default allowCors(handler);
