const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'lizhang',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'qa',
  PORT: process.env.DB_PORT || '5432',
  max: 20,
});

module.exports = pool;