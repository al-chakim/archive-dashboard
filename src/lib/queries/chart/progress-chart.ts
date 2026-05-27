import { db } from "@/lib/db";

export async function getProgressWorkflowChart() {

    const result = await db.query(`

        WITH months AS (

            SELECT
                generate_series(
                    date_trunc('month', CURRENT_DATE - interval '4 months'),
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
                        WHEN tar.status = 'Ready To Pick Up'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS ready_to_pick_up,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'Dijemput Unit Umum'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS dijemput_unit_umum,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'Siap Dijemput Unit Umum'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS siap_dijemput_unit_umum,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'Scheduled'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS scheduled,

            COALESCE(
                SUM(
                    CASE
                        WHEN tar.status = 'On Location'
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            )::int AS on_location

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