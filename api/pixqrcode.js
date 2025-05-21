const qrcode = require('qrcode');

// Função para calcular o CRC16-CCITT
function CRC16(payload) {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Função que gera o payload Pix
function gerarPayloadPix({ chave, nome, cidade, valor, mensagem }) {
  nome = nome.substring(0, 25); // nome no Pix tem limite de 25 caracteres
  cidade = cidade.substring(0, 15); // cidade no Pix tem limite de 15 caracteres

  const payloadSemCRC = [
    '000201',
    '010212',
    `26360014br.gov.bcb.pix01${(chave.length).toString().padStart(2, '0')}${chave}`,
    '52040000',
    '5303986',
    `54${valor.length.toString().padStart(2, '0')}${valor}`,
    '5802BR',
    `59${nome.length}${nome}`,
    `60${cidade.length}${cidade}`,
    mensagem ? `62${(4 + 2 + mensagem.length)}0503${mensagem}` : '',
    '6304' // Aqui vai entrar o CRC depois
  ].filter(Boolean).join('');

  const crc = CRC16(payloadSemCRC);
  return payloadSemCRC + crc;
}

// Handler da API
module.exports = async (req, res) => {
  const { chave, nome = 'PIX RECEBEDOR', cidade = 'BRASILIA', valor = '0.00', mensagem = '' } = req.query;

  if (!chave) return res.status(400).json({ error: 'Parâmetro "chave" é obrigatório.' });

  try {
    const payload = gerarPayloadPix({ chave, nome, cidade, valor, mensagem });
    const qr = await qrcode.toDataURL(payload);
    return res.status(200).json({ payload, qrcode: qr });
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao gerar QR Code', details: e.message });
  }
};
