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

Como usar

1. Faça o deploy no Vercel conectando ao repositório.


2. Acesse as rotas acima via URL pública.




---

Tecnologias

Node.js

Vercel (serverless functions)

---
