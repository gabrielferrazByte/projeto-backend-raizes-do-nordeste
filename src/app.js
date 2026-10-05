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

// Importa as rotas de produtos
const produtoRoutes =
require('./routes/produtoRoutes');

// Importa as rotas de estoque
const estoqueRoutes =
require('./routes/estoqueRoutes');

// Importa as rotas de pedidos
const pedidoRoutes =
require('./routes/pedidoRoutes');

// Importa as rotas de pagamentos
const pagamentoRoutes =
require('./routes/pagamentoRoutes');

// Todas as rotas de autenticação terão o prefixo /auth
app.use('/auth', authRoutes);

// Todas as rotas de produtos terão o prefixo /produtos
app.use('/produtos', produtoRoutes);

// Todas as rotas de estoque terão o prefixo /estoque
app.use('/estoque', estoqueRoutes);

// Todas as rotas de pedidos terão o prefixo /pedidos
app.use('/pedidos', pedidoRoutes);

// Todas as rotas de pagamentos terão o prefixo /pagamentos
app.use('/pagamentos', pagamentoRoutes);

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
