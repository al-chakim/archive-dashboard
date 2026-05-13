import { db } from "./db";

export async function getTotalArchives() {
  const result = await db.query(`
    SELECT COUNT(*) total
    FROM tr_archive_registration
  `);

  return result.rows[0];
}

export async function getArchives() {
  const result = await db.query(`
    SELECT registration_number,
           regarding,
           status
    FROM tr_archive_registration
    LIMIT 10
  `);

  return result.rows;
}
