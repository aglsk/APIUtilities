const qrcode = require('qrcode');

function format(id, value) {
  return `${id}${value.length.toString().padStart(2, '0')}${value}`;
}

function gerarPayloadPix({ chave, nome, cidade, valor, mensagem }) {
  nome = nome.substring(0, 25);
  cidade = cidade.substring(0, 15);

  const gui = format("00", "br.gov.bcb.pix");
  const chavePix = format("01", chave);
  const merchantAccount = format("26", gui + chavePix);

  const merchantCategoryCode = "52040000"; // default
  const transactionCurrency = "5303986";   // BRL
  const amount = valor ? format("54", valor) : "";
  const countryCode = "5802BR";
  const merchantName = format("59", nome);
  const merchantCity = format("60", cidade);
  const txid = mensagem ? format("05", mensagem) : "";
  const additionalDataField = mensagem ? format("62", txid) : "";

  const payloadSemCRC = [
    "000201", // Payload Format Indicator
    "010212", // Point of Initiation Method (12 = dinâmica)
    merchantAccount,
    merchantCategoryCode,
    transactionCurrency,
    amount,
    countryCode,
    merchantName,
    merchantCity,
    additionalDataField,
    "6304" // CRC16 será adicionado aqui
  ].filter(Boolean).join("");

  const crc = CRC16(payloadSemCRC);
  return payloadSemCRC + crc;
}

function CRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

module.exports = async (req, res) => {
  const { chave, nome = 'PIX RECEBEDOR', cidade = 'BRASILIA', valor = '0.00', mensagem = '' } = req.query;

  if (!chave) {
    return res.status(400).json({ error: 'Parâmetro "chave" é obrigatório' });
  }

  try {
    const payload = gerarPayloadPix({ chave, nome, cidade, valor, mensagem });
    const qr = await qrcode.toDataURL(payload);
    res.status(200).json({ payload, qrcode: qr });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar QR Code', details: err.message });
  }
};
