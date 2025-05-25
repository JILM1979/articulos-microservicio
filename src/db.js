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
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.POSTGRES_DB,
});

export default pool;