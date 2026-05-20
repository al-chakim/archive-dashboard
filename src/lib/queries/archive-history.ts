import { unstable_cache } from "next/cache";
import { db } from "../db";

export const getArchiveHistories = unstable_cache(
    async () => {
        const query = `
        SELECT
            tar.registration_number as no_registrasi,
            tar.regarding as hal_arsip,
            tar.document_number as no_dokumen,

            u.name AS nama_user,
            u.email,

            tar.source,

            (tar.registered_at AT TIME ZONE 'Asia/Jakarta')::date
                AS tanggal_registrasi,

            to_char(
                tar.registered_at AT TIME ZONE 'Asia/Jakarta',
                'HH24:MI:SS'
            ) AS jam_registrasi,

            (
                SELECT elem->>'status'
                FROM jsonb_array_elements(tar.histories::jsonb) elem
                ORDER BY (elem->>'timestamp')::bigint DESC
                LIMIT 1
            ) AS status_terakhir,

            (
                SELECT
                    (
                        to_timestamp(
                            (elem->>'timestamp')::bigint
                        ) AT TIME ZONE 'Asia/Jakarta'
                    )::date
                FROM jsonb_array_elements(tar.histories::jsonb) elem
                ORDER BY (elem->>'timestamp')::bigint DESC
                LIMIT 1
            ) AS tanggal_status_terakhir,

            (
                SELECT
                    to_char(
                        (
                            to_timestamp(
                                (elem->>'timestamp')::bigint
                            ) AT TIME ZONE 'Asia/Jakarta'
                        ),
                        'HH24:MI:SS'
                    )
                FROM jsonb_array_elements(tar.histories::jsonb) elem
                ORDER BY (elem->>'timestamp')::bigint DESC
                LIMIT 1
            ) AS jam_status_terakhir,

            (
                SELECT elem->>'createdBy'
                FROM jsonb_array_elements(tar.histories::jsonb) elem
                ORDER BY (elem->>'timestamp')::bigint DESC
                LIMIT 1
            ) AS created_by,

            tar.document_format AS format_arsip,
            tar.status_type AS tipe_dokumen

        FROM tr_archive_registration tar

        LEFT JOIN users u
            ON u.id = tar.registered_by
            AND u.name NOT IN ('Administrator RC')

        WHERE tar.histories IS NOT NULL
        AND tar.histories <> ''

        AND tar.registered_at >= '2026-01-01'
        AND tar.registered_at < NOW()

        ORDER BY tar.registered_at ASC
        
        limit 100;

    `;

        const result = await db.query(query);

        return result.rows;
    },

    ["archive-history"],

    {
        revalidate: 300,
    }
);