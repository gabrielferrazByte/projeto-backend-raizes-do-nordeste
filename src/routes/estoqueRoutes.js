// Importa Express
const express = require('express');

// Cria objeto de rotas
const router = express.Router();

// Importa controller
const estoqueController =
require('../controllers/estoqueController');

// Lista estoque
// GET /estoque
router.get(
  '/',
  estoqueController.listar
);

// Entrada de estoque
// POST /estoque/entrada
router.post(
  '/entrada',
  estoqueController.entrada
);

// Saída de estoque
// POST /estoque/saida
router.post(
  '/saida',
  estoqueController.saida
);

// Exporta rotas
module.exports = router;