import { unstable_cache } from "next/cache";
import { db } from "../db";

export const getDashboardStats = unstable_cache(
    async () => {
        const query = `
            SELECT
                COUNT(*) AS total_dokumen,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Permohonan Registrasi'
                    )
                ) AS permohonan_registrasi,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Registrasi Masuk'
                    )
                ) AS registrasi,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Registrasi Masuk Lanjutan'
                    )
                ) AS registrasi_masuk_lanjutan,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Permohonan Registrasi',
                        'Registrasi Masuk',
                        'Registrasi Masuk Lanjutan'
                    )
                ) AS registrasi_masuk,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Verifikasi Command Center',
                        'Verifikasi Unit Umum'
                    )
                ) AS verifikasi_arsip,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Permohonan Ditolak',
                        'Ditolak Command Center',
                        'Ditolak Unit Umum',
                        'Pickup Failed'
                    )
                ) AS ditolak,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Permohonan Registrasi',
                        'Registrasi Masuk',
                        'Verifikasi Command Center',
                        'Verifikasi Unit Umum',
                        'Siap Dijemput Unit Umum',
                        'Siap Dijemput Record Center',
                        'Scheduled',
                        'Ready To Pick Up',
                        'On Location',
                        'Picked Up'
                    )
                ) AS in_progress,

                COUNT(*) FILTER (
                    WHERE status = 'Verifikasi Command Center'
                ) AS verifikasi_command_center,

                COUNT(*) FILTER (
                    WHERE status = 'Verifikasi Unit Umum'
                ) AS verifikasi_unit_umum,

                COUNT(*) FILTER (
                    WHERE status IN (
                        'Siap Dijemput Unit Umum',
                        'Siap Dijemput Record Center'
                    )
                ) AS siap_dijemput,

                COUNT(*) FILTER (
                    WHERE status = 'Scheduled'
                ) AS scheduled,

                COUNT(*) FILTER (
                    WHERE status = 'Ready To Pick Up'
                ) AS ready_to_pickup,

                COUNT(*) FILTER (
                    WHERE status = 'Dijemput Unit Umum'
                ) AS pickup,

                COUNT(*) FILTER (
                    WHERE status = 'On Location'
                ) AS on_location,

                COUNT(*) FILTER (
                    WHERE status = 'Diarsipkan'
                ) AS diarsipkan,

                COUNT(*) FILTER (
                    WHERE status = 'Permohonan Ditolak'
                ) AS permohonan_ditolak,

                COUNT(*) FILTER (
                    WHERE status = 'Ditolak Command Center'
                ) AS ditolak_command_center,

                COUNT(*) FILTER (
                    WHERE status = 'Ditolak Unit Umum'
                ) AS ditolak_unit_umum,

                COUNT(*) FILTER (
                    WHERE status = 'Pickup Failed'
                ) AS pickup_failed

            FROM tr_archive_registration

            WHERE registered_at >= '2025-10-01'
            AND registered_at <= NOW()
            `;

        const result = await db.query(query);

        return result.rows[0];
    },

    ["dashboard-stats"],

    {
        revalidate: 60,
    }
);