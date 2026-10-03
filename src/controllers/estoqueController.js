// Importa conexão com banco de dados
const pool = require('../config/database');


// =======================================
// LISTAR ESTOQUE
// =======================================
// Retorna todos os produtos em estoque
exports.listar = async (req, res) => {

  try {

    const resultado = await pool.query(`
      SELECT
        e.id,
        p.nome AS produto,
        u.nome AS unidade,
        e.quantidade
      FROM estoque e
      INNER JOIN produtos p
        ON p.id = e.produto_id
      INNER JOIN unidades u
        ON u.id = e.unidade_id
      ORDER BY e.id
    `);

    res.json(resultado.rows);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao listar estoque'
    });

  }

};


// =======================================
// ENTRADA DE ESTOQUE
// =======================================
// Adiciona quantidade ao estoque
exports.entrada = async (req, res) => {

  try {

    const {
      produto_id,
      unidade_id,
      quantidade
    } = req.body;

    const resultado = await pool.query(
      `
      UPDATE estoque
      SET quantidade = quantidade + $1
      WHERE produto_id = $2
      AND unidade_id = $3
      RETURNING *
      `,
      [
        quantidade,
        produto_id,
        unidade_id
      ]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao adicionar estoque'
    });

  }

};


// =======================================
// SAÍDA DE ESTOQUE
// =======================================
// Remove quantidade do estoque
exports.saida = async (req, res) => {

  try {

    const {
      produto_id,
      unidade_id,
      quantidade
    } = req.body;

    const consulta = await pool.query(
      `
      SELECT *
      FROM estoque
      WHERE produto_id = $1
      AND unidade_id = $2
      `,
      [produto_id, unidade_id]
    );

    const estoque = consulta.rows[0];

    if (estoque.quantidade < quantidade) {

      return res.status(400).json({
        erro: 'Estoque insuficiente'
      });

    }

    const resultado = await pool.query(
      `
      UPDATE estoque
      SET quantidade = quantidade - $1
      WHERE produto_id = $2
      AND unidade_id = $3
      RETURNING *
      `,
      [
        quantidade,
        produto_id,
        unidade_id
      ]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao remover estoque'
    });

  }

};