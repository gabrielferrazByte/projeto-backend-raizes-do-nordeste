const express = require('express');

const router = express.Router();

const pedidoController =
require('../controllers/pedidoController');

// Criar pedido
router.post(
  '/',
  pedidoController.criar
);

// Listar pedidos
router.get(
  '/',
  pedidoController.listar
);

// Buscar pedido
router.get(
  '/:id',
  pedidoController.buscarPorId
);

// Atualizar status
router.patch(
  '/:id/status',
  pedidoController.atualizarStatus
);

module.exports = router;