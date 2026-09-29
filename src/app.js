// Importa o framework Express
const express = require('express');

// Cria a aplicação
const app = express();

// Permite receber e interpretar JSON nas requisições
app.use(express.json());

// Importa as rotas de autenticação
const authRoutes = require('./routes/authRoutes');

// Importa middleware de proteção
const authMiddleware = require('./middlewares/authMiddleware');

// Todas as rotas de autenticação terão o prefixo /auth
app.use('/auth', authRoutes);

// Rota principal para testar se a API está funcionando
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Raízes do Nordeste funcionando'
  });
});

// Rota protegida por JWT
app.get(
  '/perfil',
  authMiddleware,
  (req, res) => {
    
    // Retorna informações do usuário autenticado
    res.json({
      usuario: req.usuario
    });

  }
);

// Exporta a aplicação para ser utilizada pelo server.js
module.exports = app;
