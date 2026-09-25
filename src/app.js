const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Raízes do Nordeste funcionando'
  });
});

module.exports = app;