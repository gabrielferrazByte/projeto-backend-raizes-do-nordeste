// Importa o Express
const express = require('express');
// Cria um objeto de rotas
const router = express.Router();

// Importa o controller
const authController = require('../controllers/authController');

// Endpoint responsável pelo cadastro de usuários
router.post('/register', authController.register);
// Endpoint para login
router.post('/login', authController.login);

// Disponibiliza as rotas para uso em outros arquivos
module.exports = router;