// Importa a aplicação criada no app.js
const app = require('./app');

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});