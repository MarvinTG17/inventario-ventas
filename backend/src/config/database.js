import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 5,
        connectionTimeoutMillis: 10000,
      }
    : {
        host:     process.env.DB_HOST,
        port:     Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user:     process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
);

export default pool;
