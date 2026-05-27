import { db } from "@/lib/db";

export async function getStatusDistribution() {

    const query = `
        SELECT
            status,
            COUNT(*)::int AS total

        FROM tr_archive_registration

        WHERE registered_at >= '2025-10-01'
        AND registered_at <= NOW()

        AND status IN (
            'Permohonan Ditolak',
            'Ditolak Command Center',
            'Ditolak Unit Umum',
            'Pickup Failed'
        )

        GROUP BY status

        ORDER BY total DESC;
    `;

    const result = await db.query(query);

    return result.rows;
}