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

Como usar

1. Faça o deploy no Vercel conectando ao repositório.


2. Acesse as rotas acima via URL pública.




---

Tecnologias

Node.js

Vercel (serverless functions)

---
