const qrcode = require('qrcode');

function montarPayload({ chave, nome, cidade, valor }) {
  const payload = [
    '000201',
    '2642',
    '0014br.gov.bcb.pix',
    `01${chave.length.toString().padStart(2, '0')}${chave}`,
    '52040000',
    '5303986',
    `54${valor.length}${valor}`,
    '5802BR',
    `59${nome.length}${nome}`,
    `60${cidade.length}${cidade}`,
    '62180514TXuzc63bea2200', // Pode alterar esse txid se quiser
    '6304'
  ].join('');

  const crc = calcularCRC16(payload);
  return payload + crc;
}

function calcularCRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

module.exports = async (req, res) => {
  const { chave, nome, valor, cidade } = req.query;

  if (!chave || !nome || !valor || !cidade) {
    return res.status(400).json({ error: 'chave, nome, valor e cidade são obrigatórios' });
  }

  try {
    const payload = montarPayload({ chave, nome, valor, cidade });
    const qr = await qrcode.toDataURL(payload);
    res.status(200).json({ payload, qrcode: qr });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar QR Code', details: err.message });
  }
};
