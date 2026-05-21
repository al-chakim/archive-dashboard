"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

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

    created_by: string;

    format_arsip: string;
    tipe_dokumen: string;
};

type Props = {
    data: ArchiveHistory[];
};

function getStatusColor(status: string) {
    if (
        status?.includes("Permohonan Ditolak") ||
        status?.includes("Ditolak Command Center") ||
        status?.includes("Ditolak Unit Umum")
    ) {
        return "bg-red-100 text-red-700";
    }

    if (
        status?.includes("Registrasi Masuk") ||
        status?.includes("Permohonan Registrasi")
    ) {
        return "bg-blue-100 text-blue-700";
    }

    if (
        status?.includes("Verifikasi command center")
    ) {
        return "bg-fuchsia-100 text-fuchsia-700";
    }

    if (
        status?.includes("Scheduled")
    ) {
        return "bg-amber-100 text-amber-700";
    }

    if (
        status?.includes("Ready To Pick Up") ||
        status?.includes("Picked Up")
    ) {
        return "bg-cyan-100 text-cyan-700";
    }

    if (
        status?.includes("Diarsipkan")
    ) {
        return "bg-green-100 text-green-700";
    }

    if (
        status?.includes("On Location")
    ) {
        return "bg-orange-100 text-orange-700";
    }

    return "bg-slate-100 text-slate-700";
}

export default function HistoriTable({
    data,
}: Props) {
    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("Semua");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    const [perPage, setPerPage] =
        useState(5);

    const [currentPage, setCurrentPage] =
        useState(1);

    // FILTER DATA
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const searchLower =
                search.toLowerCase();

            const matchesSearch =
                item.hal_arsip
                    ?.toLowerCase()
                    .includes(searchLower) ||
                item.no_registrasi
                    ?.toLowerCase()
                    .includes(searchLower) ||
                item.no_dokumen
                    ?.toLowerCase()
                    .includes(searchLower) ||
                item.nama_user
                    ?.toLowerCase()
                    .includes(searchLower);

            const matchesStatus =
                statusFilter === "Semua"
                    ? true
                    : item.status_terakhir ===
                    statusFilter;

            const itemDate = new Date(
                item.tanggal_registrasi
            );

            const matchesStartDate =
                startDate
                    ? itemDate >=
                    new Date(startDate)
                    : true;

            const matchesEndDate =
                endDate
                    ? itemDate <=
                    new Date(endDate)
                    : true;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesStartDate &&
                matchesEndDate
            );
        });
    }, [
        data,
        search,
        statusFilter,
        startDate,
        endDate,
    ]);

    // EXPORT EXCEL
    const exportToExcel = () => {
        const worksheet =
            XLSX.utils.json_to_sheet(
                filteredData
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

    // PAGINATION
    const totalPages = Math.ceil(
        filteredData.length / perPage
    );

    const paginatedData =
        filteredData.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );

    return (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* HEADER */}
            <div className="border-b border-slate-200 p-4">
                <div className="flex flex-col gap-4">
                    {/* TOP */}
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        {/* SEARCH */}
                        <input
                            type="text"
                            placeholder="Cari histori arsip..."
                            value={search}
                            onChange={(e) => {
                                setSearch(
                                    e.target.value
                                );

                                setCurrentPage(
                                    1
                                );
                            }}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 lg:w-[350px]"
                        />

                        <div className="flex flex-wrap items-center gap-3">
                            {/* FILTER STATUS */}
                            <select
                                value={
                                    statusFilter
                                }
                                onChange={(
                                    e
                                ) => {
                                    setStatusFilter(
                                        e.target
                                            .value
                                    );

                                    setCurrentPage(
                                        1
                                    );
                                }}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
                            >
                                <option>
                                    Semua
                                </option>

                                <option>
                                    Registrasi Masuk
                                </option>

                                <option>
                                    Verifikasi Command Center
                                </option>

                                <option>
                                    Scheduled
                                </option>

                                <option>
                                    Ready to Pick Up
                                </option>

                                <option>
                                    Picked Up
                                </option>

                                <option>
                                    On Location
                                </option>

                                <option>
                                    Diarsipkan
                                </option>

                                <option>
                                    Ditolak
                                </option>
                            </select>

                            {/* LIMIT */}
                            <select
                                value={perPage}
                                onChange={(
                                    e
                                ) => {
                                    setPerPage(
                                        Number(
                                            e
                                                .target
                                                .value
                                        )
                                    );

                                    setCurrentPage(
                                        1
                                    );
                                }}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
                            >
                                <option value={5}>
                                    5
                                </option>

                                <option value={10}>
                                    10
                                </option>

                                <option value={15}>
                                    15
                                </option>

                                <option value={25}>
                                    25
                                </option>

                                <option value={50}>
                                    50
                                </option>
                            </select>

                            {/* EXPORT */}
                            <button
                                onClick={
                                    exportToExcel
                                }
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                                Export Excel
                            </button>
                        </div>
                    </div>

                    {/* FILTER TANGGAL */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-slate-600">
                                Dari
                            </label>

                            <input
                                type="date"
                                value={
                                    startDate
                                }
                                onChange={(
                                    e
                                ) => {
                                    setStartDate(
                                        e.target
                                            .value
                                    );

                                    setCurrentPage(
                                        1
                                    );
                                }}
                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm text-slate-600">
                                Sampai
                            </label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(
                                    e
                                ) => {
                                    setEndDate(
                                        e.target
                                            .value
                                    );

                                    setCurrentPage(
                                        1
                                    );
                                }}
                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-[2400px] w-full">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="min-w-[320px] p-2 text-left">
                                Hal Arsip
                            </th>

                            <th className="min-w-[220px] p-2 text-left">
                                No Registrasi
                            </th>

                            <th className="min-w-[220px] p-2 text-left">
                                No Dokumen
                            </th>

                            <th className="min-w-[220px] p-2 text-left">
                                Nama User
                            </th>

                            <th className="min-w-[250px] p-2 text-left">
                                Email
                            </th>

                            <th className="min-w-[180px] p-2 text-left">
                                Source
                            </th>

                            <th className="min-w-[180px] p-2 text-left">
                                Tanggal Registrasi
                            </th>

                            <th className="min-w-[150px] p-2 text-left">
                                Jam Registrasi
                            </th>

                            <th className="min-w-[250px] p-2 text-left">
                                Status Terakhir
                            </th>

                            <th className="min-w-[220px] p-2 text-left">
                                Tanggal Status
                            </th>

                            <th className="min-w-[180px] p-2 text-left">
                                Jam Status
                            </th>

                            {/* <th className="min-w-[220px] p-2 text-left">
                                Created By
                            </th> */}

                            <th className="min-w-[180px] p-2 text-left">
                                Format Arsip
                            </th>

                            <th className="min-w-[180px] p-2 text-left">
                                Tipe Dokumen
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.map(
                            (
                                item,
                                index
                            ) => (
                                <tr
                                    key={index}
                                    className="border-b border-slate-200 transition hover:bg-slate-50"
                                >
                                    <td className="p-2 text-slate-900 text-xs font-semibold">
                                        {
                                            item.hal_arsip
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm font-semibold">
                                        {
                                            item.no_registrasi
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.no_dokumen
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.nama_user
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.email
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.source
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.tanggal_registrasi
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.jam_registrasi
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2">
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

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.tanggal_status_terakhir
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.jam_status_terakhir
                                        }
                                    </td>

                                    {/* <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.created_by
                                        }
                                    </td> */}

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.format_arsip
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-2 text-slate-900 text-sm">
                                        {
                                            item.tipe_dokumen
                                        }
                                    </td>
                                </tr>
                            )
                        )}

                        {paginatedData.length ===
                            0 && (
                                <tr>
                                    <td
                                        colSpan={
                                            14
                                        }
                                        className="p-6 text-center text-sm text-slate-500"
                                    >
                                        Data tidak ditemukan
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col gap-3 border-t border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-slate-500">
                    Menampilkan{" "}
                    {paginatedData.length} dari{" "}
                    {filteredData.length} data
                </p>

                {/* PAGINATION BUTTON */}
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
                        }
                        className="rounded-lg border border-slate-500 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 text-slate-700"
                    >
                        Prev
                    </button>

                    {/* PAGE NUMBER */}
                    {(() => {
                        let startPage = Math.max(
                            currentPage - 1,
                            1
                        );

                        let endPage =
                            startPage + 2;

                        if (
                            endPage > totalPages
                        ) {
                            endPage = totalPages;

                            startPage =
                                Math.max(
                                    endPage - 2,
                                    1
                                );
                        }

                        const pages = [];

                        for (
                            let i = startPage;
                            i <= endPage;
                            i++
                        ) {
                            pages.push(i);
                        }

                        return (
                            <>
                                {startPage >
                                    1 && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setCurrentPage(
                                                        1
                                                    )
                                                }
                                                className="rounded-lg border border-slate-500 px-3 py-1 text-sm text-slate-700"
                                            >
                                                1
                                            </button>

                                            {startPage >
                                                2 && (
                                                    <span className="px-1 text-slate-500">
                                                        ...
                                                    </span>
                                                )}
                                        </>
                                    )}

                                {pages.map(
                                    (
                                        page
                                    ) => (
                                        <button
                                            key={
                                                page
                                            }
                                            onClick={() =>
                                                setCurrentPage(
                                                    page
                                                )
                                            }
                                            className={`rounded-lg px-3 py-1 text-sm ${currentPage ===
                                                page
                                                ? "bg-slate-900 text-slate-300"
                                                : "border border-slate-500 text-slate-700"
                                                }`}
                                        >
                                            {
                                                page
                                            }
                                        </button>
                                    )
                                )}

                                {endPage <
                                    totalPages && (
                                        <>
                                            {endPage <
                                                totalPages -
                                                1 && (
                                                    <span className="px-1 text-slate-700">
                                                        ...
                                                    </span>
                                                )}

                                            <button
                                                onClick={() =>
                                                    setCurrentPage(
                                                        totalPages
                                                    )
                                                }
                                                className="rounded-lg border border-slate-500 px-3 py-1 text-sm text-slate-700"
                                            >
                                                {
                                                    totalPages
                                                }
                                            </button>
                                        </>
                                    )}
                            </>
                        );
                    })()}

                    <button
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                        className="rounded-lg border border-slate-500 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 text-slate-700"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}