"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

const archives = [
    {
        perihal: "Dokumen Kontrak Kerja Sama Vendor",
        no_arsip: "DOC-001",
        tanggal_diarsipkan: "2026-05-13",
        no_registrasi: "REG-001/ASH/2025",
        registrator: "Umar - umar@mail.com",
        no_box: "BOX-001",
        tanggal_registrasi: "2025-01-20",
        verifikasi_arsip: "Disetujui",
        verifikasi_unit_fungsi: "Finance - Staff",
        penjadwalan: "Scheduled",
        pengambilan: "Ready to Pick Up",
        penyimpanan: "Diarsipkan",
        status: "Diarsipkan",
    },

    {
        perihal: "Surat Perizinan Operasional",
        no_arsip: "DOC-002",
        tanggal_diarsipkan: "",
        no_registrasi: "REG-002/ASH/2025",
        registrator: "Rudi - rudi@mail.com",
        no_box: "BOX-002",
        tanggal_registrasi: "2025-01-22",
        verifikasi_arsip: "Pending",
        verifikasi_unit_fungsi: "Legal - Staff",
        penjadwalan: "-",
        pengambilan: "-",
        penyimpanan: "-",
        status: "Registrasi Masuk",
    },

    {
        perihal: "Laporan Audit Tahunan",
        no_arsip: "DOC-003",
        tanggal_diarsipkan: "",
        no_registrasi: "REG-003/ASH/2025",
        registrator: "Rehan - rehan@mail.com",
        no_box: "BOX-003",
        tanggal_registrasi: "2025-01-24",
        verifikasi_arsip: "Verifikasi Command Center",
        verifikasi_unit_fungsi: "Audit - Supervisor",
        penjadwalan: "Scheduled",
        pengambilan: "Picked Up",
        penyimpanan: "-",
        status: "On Location",
    },

    {
        perihal: "Surat Pengadaan Barang",
        no_arsip: "DOC-004",
        tanggal_diarsipkan: "",
        no_registrasi: "REG-004/ASH/2025",
        registrator: "Anwar - anwar@mail.com",
        no_box: "BOX-004",
        tanggal_registrasi: "2025-01-25",
        verifikasi_arsip: "Ditolak",
        verifikasi_unit_fungsi: "Procurement - Staff",
        penjadwalan: "-",
        pengambilan: "-",
        penyimpanan: "-",
        status: "Permohonan Ditolak",
    },

    {
        perihal: "Berita Acara Serah Terima",
        no_arsip: "DOC-005",
        tanggal_diarsipkan: "",
        no_registrasi: "REG-005/ASH/2025",
        registrator: "Joko - joko@mail.com",
        no_box: "BOX-005",
        tanggal_registrasi: "2025-01-27",
        verifikasi_arsip: "Disetujui",
        verifikasi_unit_fungsi: "GA - Staff",
        penjadwalan: "Scheduled",
        pengambilan: "Ready to Pick Up",
        penyimpanan: "-",
        status: "Ready to Pick Up",
    },
];

function getStatusColor(status: string) {
    if (
        status.includes("Ditolak") ||
        status.includes("Failed")
    ) {
        return "bg-red-100 text-red-700";
    }

    if (
        status.includes("Pending") ||
        status.includes("Registrasi")
    ) {
        return "bg-blue-100 text-blue-700";
    }

    if (status.includes("Verifikasi")) {
        return "bg-fuchsia-100 text-fuchsia-700";
    }

    if (status.includes("Schedule")) {
        return "bg-amber-100 text-amber-700";
    }

    if (
        status.includes("Pick Up") ||
        status.includes("Picked")
    ) {
        return "bg-cyan-100 text-cyan-700";
    }

    if (status.includes("Diarsipkan")) {
        return "bg-green-100 text-green-700";
    }

    if (status.includes("On Location")) {
        return "bg-orange-100 text-orange-700";
    }

    return "bg-slate-100 text-slate-700";
}

export default function ArchiveTableSla() {
    const [search, setSearch] = useState("");
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
        return archives.filter((item) => {
            const matchesSearch =
                item.perihal
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.no_arsip
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.no_registrasi
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "Semua"
                    ? true
                    : item.status ===
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
            "Data Arsip SLA"
        );

        XLSX.writeFile(
            workbook,
            "data-arsip-sla.xlsx"
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
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mt-6">
            {/* HEADER */}
            <div className="p-4 border-b border-slate-200">
                <div className="flex flex-col gap-3">
                    {/* TOP */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        <input
                            type="text"
                            placeholder="Cari arsip..."
                            value={search}
                            onChange={(e) => {
                                setSearch(
                                    e.target.value
                                );

                                setCurrentPage(
                                    1
                                );
                            }}
                            className="w-full lg:w-[350px] rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
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
                                        e
                                            .target
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
                                    Ready to Pick Up
                                </option>

                                <option>
                                    On Location
                                </option>

                                <option>
                                    Diarsipkan
                                </option>

                                <option>
                                    Permohonan Ditolak
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

                                <option value={20}>
                                    20
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
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                            >
                                Export Excel
                            </button>
                        </div>
                    </div>

                    {/* FILTER TANGGAL */}
                    <div className="flex flex-wrap items-center gap-3">
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
                                        e
                                            .target
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
                                        e
                                            .target
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
                <table className="min-w-[2200px] w-full">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="text-left p-4 min-w-[300px]">
                                Hal. Arsip
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                No. Arsip
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                Tanggal Arsip
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                No. Registrasi
                            </th>

                            <th className="text-left p-4 min-w-[250px]">
                                Registrator
                            </th>

                            <th className="text-left p-4 min-w-[150px]">
                                No. Box
                            </th>

                            <th className="text-left p-4 min-w-[200px]">
                                Tanggal Registrasi
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Verifikasi Arsip
                            </th>

                            <th className="text-left p-4 min-w-[250px]">
                                Verifikasi Unit Fungsi
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                Penjadwalan
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                Pengambilan
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                Penyimpanan
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Status
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
                                    key={
                                        index
                                    }
                                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                                >
                                    <td className="p-4 text-slate-900">
                                        {
                                            item.perihal
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.no_arsip
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {item.tanggal_diarsipkan ||
                                            "-"}
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.no_registrasi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.registrator
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.no_box
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.tanggal_registrasi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                                item.verifikasi_arsip
                                            )}`}
                                        >
                                            {
                                                item.verifikasi_arsip
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.verifikasi_unit_fungsi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                                item.penjadwalan
                                            )}`}
                                        >
                                            {
                                                item.penjadwalan
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                                item.pengambilan
                                            )}`}
                                        >
                                            {
                                                item.pengambilan
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                                item.penyimpanan
                                            )}`}
                                        >
                                            {
                                                item.penyimpanan
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                                item.status
                                            )}`}
                                        >
                                            {
                                                item.status
                                            }
                                        </span>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-t border-slate-200 p-4">
                <p className="text-sm text-slate-500">
                    Menampilkan{" "}
                    {
                        paginatedData.length
                    }{" "}
                    data
                </p>

                <div className="flex items-center gap-2">
                    <button
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage -
                                1
                            )
                        }
                        className="px-3 py-1 rounded-lg border border-slate-300 text-sm disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {Array.from({
                        length: totalPages,
                    }).map(
                        (_, index) => (
                            <button
                                key={
                                    index
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        index +
                                        1
                                    )
                                }
                                className={`px-3 py-1 rounded-lg text-sm ${currentPage ===
                                    index +
                                    1
                                    ? "bg-slate-900 text-white"
                                    : "border border-slate-300"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        )
                    )}

                    <button
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage +
                                1
                            )
                        }
                        className="px-3 py-1 rounded-lg border border-slate-300 text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}