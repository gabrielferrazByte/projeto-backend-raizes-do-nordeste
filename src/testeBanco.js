const pool = require('./config/database');

async function testar() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(result.rows);
  } catch (erro) {
    console.log(erro);
  }
}

testar();