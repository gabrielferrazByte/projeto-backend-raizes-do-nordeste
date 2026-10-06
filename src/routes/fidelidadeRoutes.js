// Importa Express
const express = require('express');

const router = express.Router();

// Importa controller
const fidelidadeController =
require('../controllers/fidelidadeController');

// Consultar pontos
// GET /fidelidade/:usuario_id
router.get(
  '/:usuario_id',
  fidelidadeController.consultar
);

// Acumular pontos
router.post(
  '/acumular',
  fidelidadeController.acumular
);

// Resgatar pontos
router.post(
  '/resgatar',
  fidelidadeController.resgatar
);

module.exports = router;