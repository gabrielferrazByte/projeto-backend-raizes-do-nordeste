// Importa o framework Express
const express = require('express');

// Cria a aplicação
const app = express();

// Permite receber e interpretar JSON nas requisições
app.use(express.json());

// Rota principal para testar se a API está funcionando
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Raízes do Nordeste funcionando'
  });
});

// Exporta a aplicação para ser utilizada pelo server.js
module.exports = app;