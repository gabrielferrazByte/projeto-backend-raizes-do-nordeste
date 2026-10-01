// Conexão com o banco de dados
const pool = require('../config/database');


// ======================
// LISTAR PRODUTOS
// ======================
exports.listar = async (req, res) => {

  try {

    // Consulta todos os produtos da tabela produtos
    const resultado = await pool.query(`
      SELECT *
      FROM produtos
      ORDER BY id
    `);

    // Retorna os produtos encontrados
    res.json(resultado.rows);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao listar produtos'
    });

  }

};


// ======================
// CADASTRAR PRODUTO
// ======================

// Cria um novo produto no banco de dados
exports.criar = async (req, res) => {

  try {

    // Recebe os dados enviados pelo usuário
    const { nome, descricao, preco } = req.body;

    // Insere o produto na tabela produtos
    const resultado = await pool.query(
      `
      INSERT INTO produtos
      (nome, descricao, preco)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [nome, descricao, preco]
    );
    
    // Retorna o produto criado
    res.status(201).json(resultado.rows[0]);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao cadastrar produto'
    });

  }

};


// ======================
// ATUALIZAR PRODUTO
// ======================

// Altera os dados de um produto existente
exports.atualizar = async (req, res) => {

  try {

    // Obtém o ID enviado pela URL
    const { id } = req.params;

    // Obtém os novos dados enviados no body
    const { nome, descricao, preco } = req.body;

    // Atualiza o produto no banco
    const resultado = await pool.query(
      `
      UPDATE produtos
      SET
        nome = $1,
        descricao = $2,
        preco = $3
      WHERE id = $4
      RETURNING *
      `,
      [nome, descricao, preco, id]
    );

    // Retorna o produto atualizado
    res.json(resultado.rows[0]);

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao atualizar produto'
    });

  }

};


// ======================
// EXCLUIR PRODUTO
// ======================

// Remove um produto da base de dados
exports.excluir = async (req, res) => {

  try {

    // Recebe o ID pela URL
    const { id } = req.params;

    // Remove o produto do banco
    await pool.query(
      `
      DELETE
      FROM produtos
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      mensagem: 'Produto removido'
    });

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao excluir produto'
    });

  }

};