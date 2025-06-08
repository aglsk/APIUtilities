export default function allowCors(handler) {
  return async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end(); // Pré-voo CORS
      return;
    }

    return handler(req, res); // Continua pra função real
  };
}
