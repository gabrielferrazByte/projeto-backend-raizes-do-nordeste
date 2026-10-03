// Importa conexão com banco
const pool = require('../config/database');

// =======================================
// CRIAR PEDIDO
// =======================================
exports.criar = async (req, res) => {

  try {

    // Dados recebidos da requisição
    const {
      usuario_id,
      unidade_id,
      canal_pedido,
      valor_total
    } = req.body;

    // Valores aceitos:
    // APP, TOTEM, BALCAO, WEB e PICKUP.
    const canaisValidos = [
      'APP',
      'TOTEM',
      'BALCAO',
      'WEB',
      'PICKUP'
    ];

    // Valida canal
    if (!canaisValidos.includes(canal_pedido)) {

      return res.status(400).json({
        erro: 'Canal de pedido inválido'
      });

    }

    // Insere pedido
    const resultado = await pool.query(
      `
      INSERT INTO pedidos
      (
        usuario_id,
        unidade_id,
        canal_pedido,
        valor_total
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        usuario_id,
        unidade_id,
        canal_pedido,
        valor_total
      ]
    );

    res.status(201).json(
      resultado.rows[0]
    );

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao criar pedido'
    });

  }

};

// =======================================
// LISTAR PEDIDOS
// =======================================
exports.listar = async (req, res) => {

  try {

    const resultado = await pool.query(`
      SELECT *
      FROM pedidos
      ORDER BY id
    `);

    res.json(
      resultado.rows
    );

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao listar pedidos'
    });

  }

};

// =======================================
// BUSCAR PEDIDO
// =======================================
exports.buscarPorId = async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
      SELECT *
      FROM pedidos
      WHERE id = $1
      `,
      [id]
    );

    res.json(
      resultado.rows[0]
    );

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao buscar pedido'
    });

  }

};

// =======================================
// ATUALIZAR STATUS
// =======================================
exports.atualizarStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    const resultado = await pool.query(
      `
      UPDATE pedidos
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    res.json(
      resultado.rows[0]
    );

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao atualizar status'
    });

  }

};