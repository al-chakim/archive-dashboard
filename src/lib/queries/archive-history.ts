import { db } from "../db";

type GetArchiveHistoryParams = {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
};

export async function getArchiveHistory({
    page = 1,
    limit = 10,
    search = "",
    status = "",
    startDate = "",
    endDate = "",
}: GetArchiveHistoryParams) {

    const offset =
        (page - 1) * limit;

    const values: any[] = [];

    let whereQuery = `
        WHERE tar.histories IS NOT NULL
        AND tar.histories <> ''
        AND tar.registered_at >= '2025-10-01'
        AND tar.registered_at <= NOW()
    `;

    /*
    ===================================
    SEARCH
    ===================================
    */

    if (search.trim()) {

        values.push(`%${search}%`);

        whereQuery += `
            AND (
                tar.registration_number ILIKE $${values.length}
                OR tar.regarding ILIKE $${values.length}
                OR tar.document_number ILIKE $${values.length}
            )
        `;
    }

    /*
    ===================================
    STATUS
    ===================================
    */

    if (
        status &&
        status !== "Semua"
    ) {

        values.push(status);

        whereQuery += `
            AND (
                SELECT elem->>'status'
                FROM jsonb_array_elements(
                    tar.histories::jsonb
                ) elem
                ORDER BY (elem->>'timestamp')::bigint DESC
                LIMIT 1
            ) ILIKE $${values.length}
        `;
    }

    /*
    ===================================
    START DATE
    ===================================
    */

    if (startDate) {

        values.push(startDate);

        whereQuery += `
            AND tar.registered_at::date >= $${values.length}
        `;
    }

    /*
    ===================================
    END DATE
    ===================================
    */

    if (endDate) {

        values.push(endDate);

        whereQuery += `
            AND tar.registered_at::date <= $${values.length}
        `;
    }

    /*
    ===================================
    COUNT QUERY
    ===================================
    */

    const countQuery = `
        SELECT COUNT(*) AS total
        FROM tr_archive_registration tar
        ${whereQuery}
    `;

    const countResult =
        await db.query(
            countQuery,
            values
        );

    const totalData = Number(
        countResult.rows[0].total
    );

    /*
    ===================================
    MAIN QUERY - OPTIMIZED WITH LATERAL
    ===================================
    */

    values.push(limit);
    values.push(offset);

    const query = `
        SELECT

        tar.registration_number AS no_registrasi,

        tar.regarding AS hal_arsip,

        tar.document_number AS no_dokumen,

        u.name AS nama_user,

        u.email,

        tar.source,

        to_char(
            tar.registered_at
            AT TIME ZONE 'Asia/Jakarta',
            'YYYY-MM-DD'
        ) AS tanggal_registrasi,

        to_char(
            tar.registered_at
            AT TIME ZONE 'Asia/Jakarta',
            'HH24:MI:SS'
        ) AS jam_registrasi,

        latest_history->>'status' AS status_terakhir,

        to_char(
            to_timestamp(
                (latest_history->>'timestamp')::bigint
            ) AT TIME ZONE 'Asia/Jakarta',
            'YYYY-MM-DD'
        ) AS tanggal_status_terakhir,

        to_char(
            to_timestamp(
                (latest_history->>'timestamp')::bigint
            ) AT TIME ZONE 'Asia/Jakarta',
            'HH24:MI:SS'
        ) AS jam_status_terakhir,

        tar.document_format AS format_arsip,

        tar.status_type AS tipe_dokumen,

        tar.registered_by AS created_by

        FROM tr_archive_registration tar

        LEFT JOIN users u
        ON u.id = tar.registered_by

        LEFT JOIN LATERAL (
            SELECT elem
            FROM jsonb_array_elements(
                tar.histories::jsonb
            ) elem
            ORDER BY (elem->>'timestamp')::bigint DESC
            LIMIT 1
        ) history_data(elem) ON true
        
        LEFT JOIN LATERAL (
            VALUES (history_data.elem)
        ) AS latest_history(latest_history) ON true

        ${whereQuery}

        ORDER BY tar.registered_at DESC

        LIMIT $${values.length - 1}
        OFFSET $${values.length}
    `;

    const result =
        await db.query(
            query,
            values
        );

    return {
        data: result.rows,
        totalData,
        totalPages: Math.ceil(
            totalData / limit
        ),
        currentPage: page,
    };
}