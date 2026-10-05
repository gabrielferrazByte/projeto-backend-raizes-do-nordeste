// Importa Express
const express = require('express');

const router = express.Router();

// Importa controller
const pagamentoController =
require('../controllers/pagamentoController');

// POST /pagamentos
router.post(
  '/',
  pagamentoController.processar
);

module.exports = router;