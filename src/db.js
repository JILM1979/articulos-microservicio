import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'articulosdb',
  password: 'postgres',
  port: 5432,
});

export default pool;