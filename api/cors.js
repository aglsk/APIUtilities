export default async function handler(req, res) {
  const url = req.query.url;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "URL inválida" });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro ao buscar recurso externo" });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");

    const reader = response.body.getReader();
    const encoder = new TextEncoder();

    res.writeHead(200);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }

    res.end();

  } catch (err) {
    res.status(500).json({ error: "Erro interno no proxy", details: err.message });
  }
}
