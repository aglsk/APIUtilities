const qrcode = require('qrcode');

function formatField(id, value) {
  const length = value.length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
}

function gerarPayloadPix({ chave, nome, cidade = 'BRASILIA', valor = '0.00', txid = '***' }) {
  const merchantAccountInfo =
    formatField('00', 'br.gov.bcb.pix') +
    formatField('01', chave);

  const payloadSemCRC =
    formatField('00', '01') +
    formatField('01', '12') +
    formatField('26', merchantAccountInfo) +
    formatField('52', '0000') +
    formatField('53', '986') +
    formatField('54', valor) +
    formatField('58', 'BR') +
    formatField('59', nome.substring(0, 25)) +
    formatField('60', cidade.substring(0, 15)) +
    formatField('62', formatField('05', txid)) +
    '6304';

  const crc = CRC16(payloadSemCRC);
  return payloadSemCRC + crc;
}

function CRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

module.exports = async (req, res) => {
  const { chave, nome = 'PIX RECEBEDOR', cidade = 'BRASILIA', valor = '0.00', txid = '***' } = req.query;

  if (!chave || !nome || !cidade || !valor) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' });
  }

  const payload = gerarPayloadPix({ chave, nome, cidade, valor, txid });

  try {
    const qr = await qrcode.toDataURL(payload);
    res.status(200).json({ payload, qrcode: qr });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar QR Code', details: err.message });
  }
};
