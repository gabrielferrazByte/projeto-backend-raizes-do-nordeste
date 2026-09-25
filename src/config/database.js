const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'raizes_nordeste',
  password: '3124',
  port: 5432,
});

module.exports = pool;