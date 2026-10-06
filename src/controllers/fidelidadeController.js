// Importa conexão com o banco de dados
const pool = require('../config/database');


// =======================================
// CONSULTAR PONTOS
// =======================================
exports.consultar = async (req, res) => {

  try {

    // Obtém o id do usuário pela URL
    const { usuario_id } = req.params;

    // Busca o registro de fidelidade
    const resultado = await pool.query(
      `
      SELECT *
      FROM fidelidade
      WHERE usuario_id = $1
      `,
      [usuario_id]
    );

    // Retorna os dados encontrados
    res.json(resultado.rows[0]);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao consultar pontos'
    });

  }

};


// =======================================
// ACUMULAR PONTOS
// =======================================
//Cada compra pode gerar pontos para futuros resgates.
exports.acumular = async (req, res) => {

  try {

    // Recebe os dados enviados no body
    const {
      usuario_id,
      pontos
    } = req.body;

    // Atualiza a quantidade de pontos
    const resultado = await pool.query(
      `
      UPDATE fidelidade
      SET pontos = pontos + $1
      WHERE usuario_id = $2
      RETURNING *
      `,
      [pontos, usuario_id]
    );

    // Retorna os dados atualizados
    res.json(resultado.rows[0]);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao acumular pontos'
    });

  }

};


// =======================================
// RESGATAR PONTOS
// =======================================
// Permite utilizar pontos acumulados. O sistema verifica se o cliente possui saldo suficiente.
exports.resgatar = async (req, res) => {

  try {

    // Recebe os dados enviados
    const {
      usuario_id,
      pontos
    } = req.body;

    // Busca o saldo atual
    const consulta = await pool.query(
      `
      SELECT *
      FROM fidelidade
      WHERE usuario_id = $1
      `,
      [usuario_id]
    );

    const cliente = consulta.rows[0];

    // Verifica se existe saldo suficiente
    if (cliente.pontos < pontos) {

      return res.status(400).json({
        erro: 'Pontos insuficientes'
      });

    }

    // Subtrai os pontos do saldo
    const resultado = await pool.query(
      `
      UPDATE fidelidade
      SET pontos = pontos - $1
      WHERE usuario_id = $2
      RETURNING *
      `,
      [pontos, usuario_id]
    );

    // Retorna os dados atualizados
    res.json(resultado.rows[0]);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao resgatar pontos'
    });

  }

};