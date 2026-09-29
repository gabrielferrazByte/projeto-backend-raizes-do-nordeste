// Importa a biblioteca JWT
const jwt = require('jsonwebtoken');

// Middleware responsável por proteger rotas
module.exports = (req, res, next) => {

    // Obtém o cabeçalho Authorization
  const authHeader = req.headers.authorization;

    // Verifica se o token foi enviado
  if (!authHeader) {
    return res.status(401).json({
      erro: 'Token não informado'
    });
  }

  // Remove a palavra "Bearer"
  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(
      token,
      'segredo123'
    );

    // Salva os dados do usuário autenticado
    req.usuario = decoded;

    next();

  } catch {

    return res.status(401).json({
      erro: 'Token inválido'
    });

  }

};