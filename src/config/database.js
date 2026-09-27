// Importa a classe Pool do pacote pg
const { Pool } = require('pg');

// Cria uma conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'raizes_nordeste',
  password: '3124',
  port: 5432,
});

// Exporta a conexão para ser utilizada em outros arquivos
module.exports = pool;