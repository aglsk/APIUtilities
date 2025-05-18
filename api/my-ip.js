// api/meu-ip.js
export default function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  res.status(200).json({ ip });
}
