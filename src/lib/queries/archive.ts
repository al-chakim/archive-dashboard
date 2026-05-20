import { unstable_cache } from "next/cache";
import { pool } from "../db";

type Params = {
    search?: string;
    status?: string;
    limit?: number;
    offset?: number;
};

async function fetchArchives({
    search = "",
    status = "",
    limit = 10,
    offset = 0,
}: Params) {
    const values: any[] = [];

    let query = `
        SELECT
            registration_number,
            regarding,
            registered_at,
            status
        FROM tr_archive_registration
        WHERE 1=1
    `;

    // SEARCH
    if (search) {
        values.push(`%${search}%`);

        query += `
            AND (
                regarding ILIKE $${values.length}
                OR registration_number ILIKE $${values.length}
            )
        `;
    }

    // STATUS
    if (status && status !== "Semua") {
        values.push(status);

        query += `
            AND status = $${values.length}
        `;
    }

    // ORDER
    query += `
        ORDER BY registered_at DESC
    `;

    // LIMIT OFFSET
    values.push(limit);

    query += `
        LIMIT $${values.length}
    `;

    values.push(offset);

    query += `
        OFFSET $${values.length}
    `;

    const result = await pool.query(query, values);

    return result.rows;
}

export const getArchives = unstable_cache(
    async (params: Params) => {
        return fetchArchives(params);
    },
    ["archives-cache"],
    {
        revalidate: 300,
    },
);
