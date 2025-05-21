const qrcode = require('qrcode');

function formatarValor(valor) {
  return parseFloat(valor).toFixed(2);
}

function gerarPayloadPix({ chave, nome, cidade, valor = '0.00', txid = '' }) {
  if (!chave || !nome || !cidade) {
    throw new Error('Chave, nome e cidade são obrigatórios.');
  }

  nome = nome.substring(0, 25).toUpperCase();     // até 25 caracteres
  cidade = cidade.substring(0, 15).toUpperCase(); // até 15 caracteres
  valor = formatarValor(valor);

  // Payload formatado
  const payload = [
    '000201',                         // Payload Format Indicator
    '010212',                         // Point of Initiation Method: dynamic
    '26360014br.gov.bcb.pix',         // Merchant Account Info - GUI
    `01${String(chave.length).padStart(2, '0')}${chave}`, // chave Pix
    '52040000',                       // Merchant Category Code (default)
    '5303986',                        // Currency: BRL (986)
    `54${String(valor.length).padStart(2, '0')}${valor}`, // valor da transação
    '5802BR',                         // Country Code
    `59${String(nome.length).padStart(2, '0')}${nome}`,   // nome recebedor
    `60${String(cidade.length).padStart(2, '0')}${cidade}`, // cidade
    txid
      ? `62${(4 + txid.length).toString().padStart(2, '0')}0503${txid}` // Adicional Data Field com TXID
      : '',
    '6304' // CRC placeholder
  ];

  const payloadSemCRC = payload.filter(Boolean).join('');
  const crc = calcularCRC16(payloadSemCRC);
  return `${payloadSemCRC}${crc}`;
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
  const { chave, nome, cidade, valor = '0.00', mensagem = '' } = req.query;

  if (!chave || !nome || !cidade) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios: chave, nome, cidade' });
  }

  try {
    const payload = gerarPayloadPix({ chave, nome, cidade, valor, txid: mensagem });
    const qr = await qrcode.toDataURL(payload);

    res.status(200).json({
      payload,
      qrcode: qr
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar QR Code', details: err.message });
  }
};
