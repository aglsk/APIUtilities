# APIUtilities

Projeto com diversas APIs úteis simples e práticas, rodando em Node.js na Vercel.

## APIs disponíveis

### 1. `/meu-ip`  
Retorna o IP do cliente que fez a requisição.

**Exemplo de uso:**

GET /meu-ip

**Resposta:**  
```json
{
  "ip": "123.45.67.89"
}
```

---

### 2. /gerar-senha

Gera uma senha aleatória.

Parâmetros:

tamanho (opcional): tamanho da senha (padrão: 12)

caracteres (opcional): tipos de caracteres, valores possíveis: letras, numeros, simbolos, todos (padrão: todos)


Exemplo:

GET /gerar-senha?tamanho=16&caracteres=letras

Resposta:

{
  "senha": "AbcDefGhIjKlMnOp"
}


---

### 3 API de Perfil Netflix

 Endpoint

GET /api/netflix-profile?nome=SeuNome

 Parâmetro

- `nome` (opcional): Nome do usuário. Se não for passado, será "Convidado".

 Exemplo de uso

https://seu-projeto.vercel.app/api/netflix-profile?nome=Ulysses

 Resposta

```json
{
  "id": 1,
  "nome": "Ulysses",
  "avatar": "https://loodibee.com/wp-content/uploads/Netflix-avatar-12.png",
  "cor": "#FFD700"
}
```

Obs:

O avatar é fixo no estilo Netflix.

A cor muda com base no nome passado.

---

### API - Gerador de QR Code Pix

Esta API gera um QR Code Pix com base nas informações fornecidas, retornando tanto o payload em texto quanto a imagem do QR Code no formato base64.

 Endpoint

POST /api/pix

 Parâmetros esperados (JSON)

| Parâmetro     | Tipo   | Obrigatório | Descrição                           |
|---------------|--------|-------------|-------------------------------------|
| `chave`       | string | Sim         | Chave Pix (CPF, CNPJ, telefone, e-mail ou aleatória) |
| `nome`        | string | Sim         | Nome do recebedor (até 25 caracteres) |
| `cidade`      | string | Sim         | Cidade do recebedor (até 15 caracteres) |
| `valor`       | string | Sim         | Valor da transação (usar ponto como separador decimal) |
| `mensagem`    | string | Não         | Mensagem adicional no QR Code |

 Exemplo de Requisição

```json
{
  "chave": "16seuchave@pix.com",
  "nome": "Nickolas",
  "cidade": "BRASILIA",
  "valor": "44.50",
  "mensagem": "Pagamento"
}
```

Exemplo de Resposta

{
  "status": "success",
  "message": "QR Code gerado com sucesso",
  "payload": "00020101021226360014br.gov.bcb.pix011416seuchave@pix.com5204000053039865445.005802BR598Nickolas608BRASILIA62130503Pagamento63047781",
  "qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAYAAADApo5rAAAA..."
}

Como Usar

1. Faça uma requisição POST para o endpoint /api/pix com os dados do pagamento.


2. A API retornará o payload (texto) e a imagem do QR Code em base64.


3. Você pode exibir a imagem no navegador com a tag <img src="..." /> usando o valor de qrcode.

---

Como usar

1. Faça o deploy no Vercel conectando ao repositório.


2. Acesse as rotas acima via URL pública.




---

Tecnologias

Node.js

Vercel (serverless functions)

---
