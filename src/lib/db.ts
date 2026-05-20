// import { Pool } from "pg";

// declare global {
//   // eslint-disable-next-line no-var
//   var pool: Pool | undefined;
// }

// export const pool =
//   global.pool ||
//   new Pool({
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,

//     max: 10,

//     idleTimeoutMillis: 30000,
//   });

// if (process.env.NODE_ENV !== "production") {
//   global.pool = pool;
// }

import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

export const db =
  global.pgPool ||
  new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = db;
}
