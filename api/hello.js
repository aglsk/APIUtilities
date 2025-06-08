import allowCors from '../lib/cors.js';

function handler(req, res) {
  res.status(200).json({ mensagem: 'Hello com CORS' });
}

export default allowCors(handler);
