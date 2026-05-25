"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import * as XLSX from "xlsx";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

type ArchiveHistory = {
    no_registrasi: string;
    hal_arsip: string;
    no_dokumen: string;
    nama_user: string;
    email: string;
    source: string;
    tanggal_registrasi: string;
    jam_registrasi: string;
    status_terakhir: string;
    tanggal_status_terakhir: string;
    jam_status_terakhir: string;
    created_by: string | null;
    format_arsip: string;
    tipe_dokumen: string;
};

type Props = {
    data: ArchiveHistory[];
    totalPages: number;
    currentPage: number;
    totalData: number;
};

function getStatusColor(status: string) {
    if (
        status?.includes("Ditolak") ||
        status?.includes("Schedule Aborted"
        )
    ) {
        return "bg-red-100 text-red-700";
    }

    if (
        status?.includes(
            "Registrasi Masuk"
        )
    ) {
        return "bg-blue-100 text-blue-700";
    }

    if (
        status?.includes(
            "Verifikasi"
        )
    ) {
        return "bg-fuchsia-100 text-fuchsia-700";
    }

    if (
        status?.includes(
            "Scheduled"
        ) ||
        status?.includes("On Location"
        )
    ) {
        return "bg-amber-100 text-amber-700";
    }

    if (
        status?.includes(
            "Picked Up"
        )
    ) {
        return "bg-purple-100 text-purple-700";
    }

    if (
        status?.includes(
            "Diarsipkan"
        ) ||
        status?.includes(
            "Ready To Pick Up"
        )
    ) {
        return "bg-green-100 text-green-700";
    }

    return "bg-slate-100 text-slate-700";
}

export default function HistoriTable({
    data,
    totalPages,
    currentPage,
    totalData,
}: Props) {

    const router = useRouter();

    const pathname =
        usePathname();

    const searchParams =
        useSearchParams();

    /*
    ===================================
    STATE
    ===================================
    */

    const [search, setSearch] =
        useState("");

    /*
    ===================================
    SYNC URL
    ===================================
    */

    useEffect(() => {

        setSearch(
            searchParams.get(
                "search"
            ) || ""
        );

    }, [searchParams]);

    /*
    ===================================
    QUERY BUILDER
    ===================================
    */

    const createQueryString = (
        values: Record<
            string,
            string
        >
    ) => {

        const params =
            new URLSearchParams(
                searchParams.toString()
            );

        Object.entries(values).forEach(
            ([key, value]) => {

                if (
                    !value ||
                    value === "Semua"
                ) {
                    params.delete(key);

                    return;
                }

                params.set(
                    key,
                    value
                );
            }
        );

        return params.toString();
    };

    /*
    ===================================
    SEARCH
    ===================================
    */

    useEffect(() => {

        const timeout =
            setTimeout(() => {

                const query =
                    createQueryString(
                        {
                            search,
                            page: "1",
                        }
                    );

                router.push(
                    `${pathname}?${query}`
                );

            }, 500);

        return () =>
            clearTimeout(timeout);

    }, [search]);

    /*
    ===================================
    EXPORT
    ===================================
    */

    const exportToExcel = () => {

        const worksheet =
            XLSX.utils.json_to_sheet(
                data
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Histori Arsip"
        );

        XLSX.writeFile(
            workbook,
            "histori-arsip.xlsx"
        );
    };

    /*
    ===================================
    PAGINATION
    ===================================
    */

    const paginationNumbers =
        useMemo(() => {

            if (totalPages <= 7) {
                return Array.from(
                    {
                        length: totalPages,
                    },
                    (_, i) => i + 1
                );
            }

            const pages: (number | string)[] =
                [];

            // Add first page
            pages.push(1);

            // Calculate range around current page
            let start =
                Math.max(
                    2,
                    currentPage - 1
                );

            let end =
                Math.min(
                    totalPages - 1,
                    currentPage + 1
                );

            // Add ellipsis if needed
            if (start > 2) {
                pages.push("...");
            }

            // Add middle pages
            for (
                let i = start;
                i <= end;
                i++
            ) {
                pages.push(i);
            }

            // Add ellipsis if needed
            if (
                end <
                totalPages - 1
            ) {
                pages.push("...");
            }

            // Add last page
            pages.push(totalPages);

            return pages;

        }, [
            currentPage,
            totalPages,
        ]);

    return (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* FILTER */}
            <div className="border-b border-slate-200 p-4">

                <div className="flex flex-wrap gap-3">

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Cari histori arsip..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 lg:w-[300px]"
                    />

                    {/* STATUS */}
                    <select
                        value={
                            searchParams.get(
                                "status"
                            ) || "Semua"
                        }
                        onChange={(e) => {

                            const query =
                                createQueryString(
                                    {
                                        status:
                                            e.target
                                                .value,
                                        page: "1",
                                    }
                                );

                            router.push(
                                `${pathname}?${query}`
                            );
                        }}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
                    >

                        <option value="Semua">
                            Semua
                        </option>

                        <option value="Permohonan Registrasi">
                            Permohonan Registrasi
                        </option>

                        <option value="Registrasi Masuk">
                            Registrasi Masuk
                        </option>

                        <option value="Permohonan Ditolak">
                            Permohonan Ditolak
                        </option>

                        <option value="Verifikasi Command Center">
                            Verifikasi Command Center
                        </option>

                        <option value="Scheduled">
                            Scheduled
                        </option>

                        <option value="Ready To Pick Up">
                            Ready To Pick Up
                        </option>

                        <option value="Picked Up">
                            Picked Up
                        </option>

                        <option value="On Location">
                            On Location
                        </option>

                        <option value="Diarsipkan">
                            Diarsipkan
                        </option>

                    </select>

                    {/* START DATE */}
                    <input
                        type="date"
                        value={
                            searchParams.get(
                                "startDate"
                            ) || ""
                        }
                        onChange={(e) => {

                            const query =
                                createQueryString(
                                    {
                                        startDate:
                                            e.target
                                                .value,
                                        page: "1",
                                    }
                                );

                            router.push(
                                `${pathname}?${query}`
                            );
                        }}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
                    />

                    {/* END DATE */}
                    <input
                        type="date"
                        value={
                            searchParams.get(
                                "endDate"
                            ) || ""
                        }
                        onChange={(e) => {

                            const query =
                                createQueryString(
                                    {
                                        endDate:
                                            e.target
                                                .value,
                                        page: "1",
                                    }
                                );

                            router.push(
                                `${pathname}?${query}`
                            );
                        }}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
                    />

                    {/* LIMIT */}
                    <select
                        value={
                            searchParams.get(
                                "limit"
                            ) || "5"
                        }
                        onChange={(e) => {

                            const query =
                                createQueryString(
                                    {
                                        limit:
                                            e.target
                                                .value,
                                        page: "1",
                                    }
                                );

                            router.push(
                                `${pathname}?${query}`
                            );
                        }}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
                    >

                        <option value="5">
                            5
                        </option>

                        <option value="10">
                            10
                        </option>

                        <option value="15">
                            15
                        </option>

                        <option value="20">
                            20
                        </option>

                    </select>

                    {/* EXPORT */}
                    <button
                        onClick={
                            exportToExcel
                        }
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white"
                    >
                        Export Excel
                    </button>

                </div>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

                <table className="min-w-[2000px] w-full wh">

                    <thead className="bg-slate-100 text-slate-700 text-sm">

                        <tr>

                            <th className="p-3 text-left">
                                No Registrasi
                            </th>

                            <th className="p-3 text-left">
                                Hal Arsip
                            </th>

                            <th className="p-3 text-left">
                                No Dokumen
                            </th>

                            <th className="p-3 text-left">
                                Nama
                            </th>

                            <th className="p-3 text-left">
                                Email
                            </th>

                            <th className="p-3 text-left">
                                Sumber
                            </th>

                            <th className="p-3 text-left">
                                Tanggal Registrasi
                            </th>

                            <th className="p-3 text-left">
                                Jam
                            </th>

                            <th className="p-3 text-left ">
                                Satus Terakhir
                            </th>

                            <th className="p-3 text-left">
                                Tanggal Status Terakhir
                            </th>

                            <th className="p-3 text-left">
                                Jam Status Terakhir
                            </th>

                            <th className="p-3 text-left">
                                Format Arsip
                            </th>

                            <th className="p-3 text-left">
                                Tipe Dokumen
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.map(
                            (
                                item,
                                index
                            ) => (
                                <tr
                                    key={`${item.no_registrasi}-${index}`}
                                    className="border-b"
                                >

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.no_registrasi
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.hal_arsip
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.no_dokumen
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.nama_user
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.email
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.source
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700 whitespace-nowrap">
                                        {
                                            item.tanggal_registrasi
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700 whitespace-nowrap">
                                        {
                                            item.jam_registrasi
                                        }
                                    </td>

                                    <td className="p-3 whitespace-nowrap">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                                                item.status_terakhir
                                            )}`}
                                        >
                                            {
                                                item.status_terakhir
                                            }
                                        </span>

                                    </td>

                                    <td className="p-3 text-sm text-slate-700 whitespace-nowrap">
                                        {
                                            item.tanggal_status_terakhir
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700 whitespace-nowrap">
                                        {
                                            item.jam_status_terakhir
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.format_arsip
                                        }
                                    </td>

                                    <td className="p-3 text-sm text-slate-700">
                                        {
                                            item.tipe_dokumen
                                        }
                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between p-4">

                <p className="text-sm text-slate-500">
                    Total Data:
                    {" "}
                    {totalData}
                </p>

                <div className="flex gap-2">

                    <button
                        disabled={
                            currentPage === 1
                        }
                        onClick={() => {

                            const query =
                                createQueryString(
                                    {
                                        page: String(
                                            currentPage - 1
                                        ),
                                    }
                                );

                            router.push(
                                `${pathname}?${query}`
                            );
                        }}
                        className="rounded-lg border px-3 py-1 text-sm text-slate-700"
                    >
                        Prev
                    </button>

                    {paginationNumbers.map(
                        (page, index) => {

                            if (
                                page === "..."
                            ) {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="flex items-center px-2 py-1 text-slate-700"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={`page-${page}`}
                                    onClick={() => {

                                        const query =
                                            createQueryString(
                                                {
                                                    page: String(
                                                        page
                                                    ),
                                                }
                                            );

                                        router.push(
                                            `${pathname}?${query}`
                                        );
                                    }}
                                    className={`rounded-lg px-3 py-1 text-sm ${currentPage ===
                                        page
                                        ? "bg-slate-900 text-white"
                                        : "border text-slate-700"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        }
                    )}

                    <button
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() => {

                            const query =
                                createQueryString(
                                    {
                                        page: String(
                                            currentPage + 1
                                        ),
                                    }
                                );

                            router.push(
                                `${pathname}?${query}`
                            );
                        }}
                        className="rounded-lg border px-3 py-1 text-sm text-slate-700"
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>
    );
}