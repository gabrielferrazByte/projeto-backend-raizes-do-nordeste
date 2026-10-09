# API Raízes do Nordeste

Projeto desenvolvido para a disciplina de Desenvolvimento Back-End.

Sistema para gerenciamento da rede de lanchonetes Raízes do Nordeste.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- JWT
- Bcrypt
- Swagger
- Postman

## Instalação

Clone o repositório:

```bash
git clone https://github.com/gabrielferrazByte/projeto-backend-raizes-do-nordeste.git
```

Instale as dependências:

```bash
npm install
```

## Banco de Dados

Crie o banco:

```sql
CREATE DATABASE raizes_nordeste;
```

Execute o arquivo:

```text
database/schema.sql
```

## Executar

```bash
npm run dev
```

Servidor:

```text
http://localhost:3000
```

## Documentação Swagger

```text
http://localhost:3000/api-docs
```

## Principais Endpoints

### Autenticação

```http
POST /auth/register
POST /auth/login
```

### Produtos

```http
GET /produtos
POST /produtos
PUT /produtos/:id
DELETE /produtos/:id
```

### Estoque

```http
GET /estoque
POST /estoque/entrada
POST /estoque/saida
```

### Pedidos

```http
GET /pedidos
POST /pedidos
PATCH /pedidos/:id/status
```

### Pagamentos

```http
POST /pagamentos
```

### Fidelidade

```http
GET /fidelidade/:usuario_id
POST /fidelidade/acumular
POST /fidelidade/resgatar
```

## Testes

Os testes dos endpoints foram realizados utilizando Postman
e salvos na pasta docs em formato JSON.

## Autor

Gabriel Ferraz Lima Freitas