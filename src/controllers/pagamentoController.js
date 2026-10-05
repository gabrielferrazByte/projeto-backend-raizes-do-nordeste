// Importa conexão com banco
const pool = require('../config/database');


// =======================================
// PROCESSAR PAGAMENTO MOCK
// =======================================
// Simula aprovação ou recusa do pagamento
exports.processar = async (req, res) => {

  try {

    // Recebe os dados enviados
    const {
      pedido_id,
      metodo,
      status
    } = req.body;

    // Cria registro do pagamento
    const pagamento = await pool.query(
      `
      INSERT INTO pagamentos
      (
        pedido_id,
        metodo,
        status,
        data_pagamento
      )
      VALUES
      ($1, $2, $3, NOW())
      RETURNING *
      `,
      [
        pedido_id,
        metodo,
        status
      ]
    );

    // Caso aprovado
    if (status === 'APROVADO') {

      await pool.query(
        `
        UPDATE pedidos
        SET status = 'PAGO'
        WHERE id = $1
        `,
        [pedido_id]
      );

    }

    // Retorna resultado
    res.status(201).json({
      mensagem: 'Pagamento processado',
      pagamento: pagamento.rows[0]
    });

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao processar pagamento'
    });

  }

};