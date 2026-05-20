"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const archives = [
    {
        hal_arsip:
            "Dokumen Kontrak Kerja Sama Vendor",
        no_arsip: "DOC-001",
        tanggal_arsip: "2025-01-25",
        no_registrasi: "REG-001/ASH/2025",
        registrator: "Umar",
        no_box: "BOX-001",
        tanggal_registrasi: "2025-01-20",
        verifikasi_arsip: "Approved",
        verifikasi_unit_fungsi:
            "Approved",
        penjadwalan: "Scheduled",
        pengambilan: "Picked Up",
        penyimpanan: "On Location",
        status: "Diarsipkan",
    },

    {
        hal_arsip:
            "Surat Perizinan Operasional",
        no_arsip: "DOC-002",
        tanggal_arsip: "",
        no_registrasi: "REG-002/ASH/2025",
        registrator: "Rudi",
        no_box: "BOX-002",
        tanggal_registrasi: "2025-01-22",
        verifikasi_arsip: "Pending",
        verifikasi_unit_fungsi:
            "Waiting",
        penjadwalan: "-",
        pengambilan: "-",
        penyimpanan: "-",
        status: "Registrasi Masuk",
    },

    {
        hal_arsip:
            "Laporan Audit Tahunan",
        no_arsip: "DOC-003",
        tanggal_arsip: "",
        no_registrasi: "REG-003/ASH/2025",
        registrator: "Rehan",
        no_box: "BOX-003",
        tanggal_registrasi: "2025-01-24",
        verifikasi_arsip: "Rejected",
        verifikasi_unit_fungsi:
            "Rejected",
        penjadwalan: "-",
        pengambilan: "-",
        penyimpanan: "-",
        status: "Ditolak",
    },
];

function getStatusColor(status: string) {
    if (status.includes("Ditolak")) {
        return "bg-red-100 text-red-700";
    }

    if (status.includes("Diarsipkan")) {
        return "bg-green-100 text-green-700";
    }

    if (
        status.includes("Registrasi")
    ) {
        return "bg-blue-100 text-blue-700";
    }

    return "bg-slate-100 text-slate-700";
}

export default function ArchiveTable() {
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
        return archives.filter((item) => {
            const matchesSearch =
                item.hal_arsip
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.no_registrasi
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.no_arsip
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "Semua"
                    ? true
                    : item.status ===
                    statusFilter;

            // FILTER TANGGAL
            const itemDate =
                new Date(
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

    // PAGINATION
    const totalPages = Math.ceil(
        filteredData.length / perPage
    );

    const paginatedData =
        filteredData.slice(
            (currentPage - 1) *
            perPage,
            currentPage * perPage
        );

    // EXPORT EXCEL
    const handleExportExcel = () => {
        const worksheet =
            XLSX.utils.json_to_sheet(
                filteredData
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Data Arsip"
        );

        const excelBuffer =
            XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

        const fileData = new Blob(
            [excelBuffer],
            {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            }
        );

        saveAs(
            fileData,
            `data-arsip-${Date.now()}.xlsx`
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border mt-6 border-slate-200">
            {/* HEADER */}
            <div className="p-4 border-b border-slate-200">
                <div className="flex flex-col gap-3">
                    {/* ROW 1 */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        {/* SEARCH */}
                        <input
                            type="text"
                            placeholder="Cari arsip..."
                            value={search}
                            onChange={(e) => {
                                setSearch(
                                    e.target.value
                                );

                                setCurrentPage(1);
                            }}
                            className="w-full lg:w-[350px] rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                        />

                        {/* RIGHT ACTION */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* FILTER STATUS */}
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(
                                        e.target.value
                                    );

                                    setCurrentPage(1);
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
                                    Diarsipkan
                                </option>

                                <option>
                                    Ditolak
                                </option>
                            </select>

                            {/* LIMIT */}
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    setPerPage(
                                        Number(
                                            e.target.value
                                        )
                                    );

                                    setCurrentPage(1);
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
                                    handleExportExcel
                                }
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                            >
                                Export Excel
                            </button>
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* START DATE */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-slate-600">
                                Dari
                            </label>

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(
                                        e.target.value
                                    );

                                    setCurrentPage(1);
                                }}
                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                            />
                        </div>

                        {/* END DATE */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-slate-600">
                                Sampai
                            </label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(
                                        e.target.value
                                    );

                                    setCurrentPage(1);
                                }}
                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-[2000px] w-full">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="text-left p-4">
                                Hal. Arsip
                            </th>

                            <th className="text-left p-4">
                                No. Arsip
                            </th>

                            <th className="text-left p-4">
                                Tanggal Arsip
                            </th>

                            <th className="text-left p-4">
                                No. Registrasi
                            </th>

                            <th className="text-left p-4">
                                Registrator
                            </th>

                            <th className="text-left p-4">
                                No. Box
                            </th>

                            <th className="text-left p-4">
                                Tanggal Registrasi
                            </th>

                            <th className="text-left p-4">
                                Verifikasi Arsip
                            </th>

                            <th className="text-left p-4">
                                Verifikasi Unit Fungsi
                            </th>

                            <th className="text-left p-4">
                                Penjadwalan
                            </th>

                            <th className="text-left p-4">
                                Pengambilan
                            </th>

                            <th className="text-left p-4">
                                Penyimpanan
                            </th>

                            <th className="text-left p-4">
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
                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.hal_arsip
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.no_arsip
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.tanggal_arsip
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.no_registrasi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.registrator
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.no_box
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.tanggal_registrasi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.verifikasi_arsip
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.verifikasi_unit_fungsi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.penjadwalan
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.pengambilan
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-800">
                                        {
                                            item.penyimpanan
                                        }
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${getStatusColor(
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
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-t border-slate-200 p-4">
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
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
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
                                className={`rounded-lg px-3 py-1 text-sm ${currentPage ===
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
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}