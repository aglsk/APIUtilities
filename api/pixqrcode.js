import qrcode from 'qrcode';

function gerarPayloadPix({ chave, nome, cidade = 'BRASILIA', valor = '0.00', mensagem = '' }) {
  const BRCode = [
    '000201', // Payload Format Indicator
    '010212', // Point of Initiation Method: 12 = dinâmico, 11 = estático
    `26340014br.gov.bcb.pix0114${chave.length}${chave}`,
    `52040000`, // Merchant Category Code
    `5303986`,  // Currency (986 = BRL)
    `54${valor.length < 2 ? '0' + valor.length : valor.length}${valor}`, // Valor
    `5802BR`,   // País
    `59${nome.length}${nome}`, // Nome do recebedor
    `60${cidade.length}${cidade}`, // Cidade
    mensagem ? `62${mensagem.length + 4}0503${mensagem}` : '',
    '6304' // CRC será preenchido depois
  ];

  const semCRC = BRCode.filter(l => l).join('');
  const crc = CRC16(semCRC);
  return `${semCRC}${crc}`;
}

function CRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

export default async function handler(req, res) {
  const { chave, nome = 'PIX RECEBEDOR', cidade = 'BRASILIA', valor = '0.00', mensagem = '' } = req.query;

  if (!chave) {
    return res.status(400).json({ error: 'Parâmetro "chave" é obrigatório' });
  }

  const payload = gerarPayloadPix({ chave, nome, cidade, valor, mensagem });

  try {
    const qr = await qrcode.toDataURL(payload);
    res.status(200).json({
      payload,
      qrcode: qr
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar QR Code', details: err.message });
  }
}
