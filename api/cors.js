// proxy.js (Node.js + Express)
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url param');

  try {
    const response = await fetch(url);
    const body = await response.buffer();

    // repassa o content-type original
    res.set('Content-Type', response.headers.get('content-type'));
    res.send(body);
  } catch (err) {
    res.status(500).send('Error fetching URL');
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
