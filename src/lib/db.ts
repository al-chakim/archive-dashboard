import { Pool, QueryResult } from "pg";

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  throw new Error("Database environment variables are missing");
}

export const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // jika perlu SSL
  ssl: false,
});

export const query = async (
  text: string,
  params?: (string | number | boolean | null)[],
): Promise<QueryResult> => {
  const start = Date.now();

  const res = await db.query(text, params);

  const duration = Date.now() - start;

  console.log(`Query executed in ${duration}ms`);

  return res;
};
