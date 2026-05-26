import { db } from "../../db";

export async function getRegistrationChart() {

    const result = await db.query(`
        WITH months AS (

            SELECT
                generate_series(
                    date_trunc('month', CURRENT_DATE - interval '6 months'),
                    date_trunc('month', CURRENT_DATE),
                    interval '1 month'
                ) AS month_date

        )

        SELECT
            TO_CHAR(
                months.month_date,
                'Mon YYYY'
            ) AS month,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'Permohonan Registrasi'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS permohonan_registrasi,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'Registrasi Masuk'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS registrasi_masuk,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'Registrasi Masuk Lanjutan'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS registrasi_masuk_lanjutan

        FROM months

        LEFT JOIN tr_archive_registration tar
            ON date_trunc('month', tar.registered_at)
            = months.month_date

        GROUP BY
            months.month_date

        ORDER BY
            months.month_date ASC
    `);

    return result.rows;
}

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