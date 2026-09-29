// Biblioteca utilizada para criptografar senhas
const bcrypt = require('bcrypt');

// Biblioteca para geração de tokens JWT
const jwt = require('jsonwebtoken');

// Conexão com o banco de dados
const pool = require('../config/database');

// ===============================
// CADASTRO DE USUÁRIO
// ===============================
exports.register = async (req, res) => {
  try {

    // Dados enviados no body da requisição
    const { nome, email, senha, perfil } = req.body;

    // Criptografa a senha antes de salvar no banco
    const senhaHash = await bcrypt.hash(senha, 10);

    // Insere o usuário na tabela usuarios
    const resultado = await pool.query(
      `
      INSERT INTO usuarios
      (nome, email, senha_hash, perfil)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [nome, email, senhaHash, perfil]
    );
    
    // Retorna o usuário criado
    res.status(201).json(resultado.rows[0]);

  } catch (erro) {
    
    console.error(erro);

    res.status(500).json({
      erro: 'Erro ao cadastrar usuário'
    });
  }
};

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {
  try {

    // Recebe email e senha enviados pelo usuário
    const { email, senha } = req.body;

    // Procura o usuário no banco de dados
    const resultado = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE email = $1
      `,
      [email]
    );

    // Valida se o usuário existe
    if (resultado.rows.length === 0) {
      return res.status(401).json({
        erro: 'Usuário não encontrado'
      });
    }

    // Guarda os dados do usuário encontrado
    const usuario = resultado.rows[0];

    // Compara a senha digitada com a senha criptografada
    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha_hash
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: 'Senha inválida'
      });
    }

    // Cria o token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        perfil: usuario.perfil
      },
      'segredo123',
      {
        expiresIn: '1h'
      }
    );

    // Retorna o token para o usuário
    res.json({
      token
    });

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      erro: 'Erro no login'
    });

  }
};