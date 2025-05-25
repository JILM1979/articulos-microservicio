import pkg from 'pg';
const { Pool } = pkg;
/*
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'articulosdb',
  password: 'postgres',
  port: 5432,
});
*/
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export default pool;