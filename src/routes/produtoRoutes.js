// Importa o Express
const express = require('express');

// Cria o objeto de rotas
const router = express.Router();

// Importa o controller de produtos
const produtoController =
require('../controllers/produtoController');

// =======================================
// LISTAR PRODUTOS
// =======================================
// GET /produtos
router.get('/', produtoController.listar);


// =======================================
// CADASTRAR PRODUTO
// =======================================
// POST /produtos
router.post('/', produtoController.criar);


// =======================================
// ATUALIZAR PRODUTO
// =======================================
// PUT /produtos/:id
router.put('/:id', produtoController.atualizar);


// =======================================
// EXCLUIR PRODUTO
// =======================================
// DELETE /produtos/:id
router.delete('/:id', produtoController.excluir);


// Exporta as rotas
module.exports = router;