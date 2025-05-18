// api/gerar-senha.js
export default function handler(req, res) {
  const letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  const simbolos = '!@#$%&*()_+-=[]{}|;:,.<>?';

  const tipo = req.query.caracteres || 'todos';
  let charset = letras + numeros + simbolos;

  if (tipo === 'letras') charset = letras;
  if (tipo === 'numeros') charset = numeros;
  if (tipo === 'simbolos') charset = simbolos;

  const tamanho = parseInt(req.query.tamanho) || 12;
  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    senha += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  res.status(200).json({ senha });
}
