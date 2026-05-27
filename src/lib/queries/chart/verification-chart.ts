import { db } from "@/lib/db";

export async function getVerificationChart() {

    const result = await db.query(`
        WITH months AS (

            SELECT
                generate_series(
                    date_trunc('month', CURRENT_DATE - interval '3 months'),
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
                        WHEN tar.status = 'Verifikasi Command Center'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS verifikasi_command_center,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'Verifikasi Unit Umum'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS verifikasi_unit_umum

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