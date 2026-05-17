"use client";

import { useMemo, useState } from "react";

const archives = [
    {
        perihal: "Dokumen Kontrak Kerja Sama Vendor",
        no_registrasi: "REG-001/ASH/2025",
        no_arsip: "DOC-001",
        tanggal_registrasi: "2025-01-20",
        pic_registrasi: "Umar - umar@mail.com",
        no_box: "00344",
        divisi: "DIV MUM",
        sumber: "ELARCH",
        tanggal_diarsipkan: "",
        unit_fungsi: "MUM - Staff",
        unit_umum: "UNIT UMUM",
        status_registrasi: "Permohonan Registrasi",
        status_arsip: "",
        status_inisiasi: "",
        format: "Fisik",
        document_type: "Aktif",
        tanggal_update: "2026-05-13",
    },

    {
        perihal: "Surat Perizinan Operasional",
        no_registrasi: "REG-002/ASH/2025",
        no_arsip: "DOC-002",
        tanggal_registrasi: "2025-01-20",
        pic_registrasi: "Rudi - rudi@mail.com",
        no_box: "00344",
        divisi: "DIV KOM",
        sumber: "ELARCH",
        tanggal_diarsipkan: "",
        unit_fungsi: "KOM - Staff",
        unit_umum: "UNIT UMUM",
        status_registrasi: "Registrasi Masuk",
        status_arsip: "",
        status_inisiasi: "",
        format: "Fisik",
        document_type: "Aktif",
        tanggal_update: "2026-05-13",
    },

    {
        perihal: "Dokumen Serah Terima",
        no_registrasi: "REG-003/ASH/2025",
        no_arsip: "DOC-003",
        tanggal_registrasi: "2025-01-20",
        pic_registrasi: "Yanu - yanu@mail.com",
        no_box: "00344",
        divisi: "DIV STI",
        sumber: "ELARCH",
        tanggal_diarsipkan: "2026-05-13",
        unit_fungsi: "STI - Staff",
        unit_umum: "UNIT UMUM",
        status_registrasi: "Diarsipkan",
        status_arsip: "Tersedia",
        status_inisiasi: "",
        format: "Fisik",
        document_type: "Inaktif",
        tanggal_update: "2026-05-13",
    },

    {
        perihal: "Laporan Audit Tahunan",
        no_registrasi: "REG-014/ASH/2025",
        no_arsip: "DOC-014",
        tanggal_registrasi: "2025-01-20",
        pic_registrasi: "Rehan - rehan@mail.com",
        no_box: "00344",
        divisi: "DIV SDM",
        sumber: "ELARCH",
        tanggal_diarsipkan: "",
        unit_fungsi: "SDM - Staff",
        unit_umum: "UNIT UMUM",
        status_registrasi: "Permohonan Registrasi",
        status_arsip: "",
        status_inisiasi: "",
        format: "Fisik",
        document_type: "Aktif",
        tanggal_update: "2026-05-13",
    },

    {
        perihal: "Surat Pengadaan Barang",
        no_registrasi: "REG-054/ASH/2025",
        no_arsip: "DOC-054",
        tanggal_registrasi: "2025-01-20",
        pic_registrasi: "Anwar - anwar@mail.com",
        no_box: "00344",
        divisi: "DIV TCO",
        sumber: "ELARCH",
        tanggal_diarsipkan: "",
        unit_fungsi: "TCO - Staff",
        unit_umum: "UNIT UMUM",
        status_registrasi: "Verifikasi Command Center",
        status_arsip: "",
        status_inisiasi: "",
        format: "Fisik",
        document_type: "Aktif",
        tanggal_update: "2026-05-13",
    },

    {
        perihal: "Surat Permohonan Kegiatan CSR",
        no_registrasi: "REG-057/ASH/2025",
        no_arsip: "DOC-057",
        tanggal_registrasi: "2025-01-20",
        pic_registrasi: "Joko - joko@mail.com",
        no_box: "00344",
        divisi: "DIV HSR",
        sumber: "ELARCH",
        tanggal_diarsipkan: "",
        unit_fungsi: "HSR - Staff",
        unit_umum: "UNIT UMUM",
        status_registrasi: "Ditolak",
        status_arsip: "",
        status_inisiasi: "",
        format: "Fisik",
        document_type: "Aktif",
        tanggal_update: "2026-05-13",
    },
];

function getStatusColor(status) {
    if (status.includes("Ditolak")) {
        return "bg-red-100 text-red-700";
    }

    if (status.includes("Permohonan Registrasi")) {
        return "bg-gray-200 text-gray-700";
    }

    if (status.includes("Registrasi Masuk")) {
        return "bg-blue-100 text-blue-700";
    }

    if (status.includes("Diarsipkan")) {
        return "bg-green-100 text-green-700";
    }

    if (status.includes("Verifikasi Command Center")) {
        return "bg-fuchsia-100 text-fuchsia-700";
    }
}

export default function ArchiveTable() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("Semua");

    const [perPage, setPerPage] = useState(5);

    const [currentPage, setCurrentPage] =
        useState(1);

    // FILTER DATA
    const filteredData = useMemo(() => {
        return archives.filter((item) => {
            const matchesSearch =
                item.perihal
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.no_registrasi
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.no_arsip
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "Semua"
                    ? true
                    : item.status_registrasi ===
                    statusFilter;

            return (
                matchesSearch && matchesStatus
            );
        });
    }, [search, statusFilter]);

    // PAGINATION
    const totalPages = Math.ceil(
        filteredData.length / perPage
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    return (
        <div className="bg-white rounded-md shadow-sm border mt-6 border-slate-300">
            {/* HEADER */}
            <div className="p-4 border-b border-slate-200">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Cari data arsip..."
                        value={search}
                        onChange={(e) => {
                            setSearch(
                                e.target.value
                            );
                            setCurrentPage(1);
                        }}
                        className="text-slate-700 w-full lg:w-[350px] rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
                    />

                    <div className="flex flex-wrap items-center gap-3">
                        {/* FILTER */}
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(
                                    e.target.value
                                );

                                setCurrentPage(1);
                            }}
                            className="text-slate-700 rounded-lg border border-slate-300 px-4 py-2 text-sm"
                        >
                            <option>
                                Semua
                            </option>

                            <option>
                                Permohonan Registrasi
                            </option>

                            <option>
                                Permohonan Ditolak
                            </option>

                            <option>
                                Registrasi Masuk
                            </option>

                            <option>
                                Verifikasi Command Center
                            </option>

                            <option>
                                Ditolak Command Center
                            </option>

                            <option>
                                Ditolak Unit Umum
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
                                Pickup Failed
                            </option>

                            <option>
                                On Location
                            </option>

                            <option>
                                Diarsipkan
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
                            className="text-slate-700 rounded-lg border border-slate-300 px-4 py-2 text-sm "
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
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="w-full overflow-x-scroll overflow-y-hidden">
                <table className="min-w-[2200px]">
                    <thead className="bg-slate-200 text-slate-700">
                        <tr>
                            <th className="text-left p-4 min-w-[250px]">
                                Perihal
                            </th>

                            <th className="text-left p-4 min-w-[250px]">
                                No. Registrasi
                            </th>

                            <th className="text-left p-4 min-w-[350px]">
                                No. Arsip
                            </th>

                            <th className="text-left p-4 min-w-[250px]">
                                Tanggal Registrasi
                            </th>

                            <th className="text-left p-4 min-w-[200px]">
                                PIC Registrasi
                            </th>

                            <th className="text-left p-4 min-w-[250px]">
                                No. Box
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                Divisi
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                Sumber
                            </th>

                            <th className="text-left p-4 min-w-[250px]">
                                Tanggal Diarsipkan
                            </th>

                            <th className="text-left p-4 min-w-[180px]">
                                Unit Fungsi
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Unit Umum
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Status Registrasi
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Status Arsip
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Status Inisiasi
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                format
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Tipe Dokumen
                            </th>

                            <th className="text-left p-4 min-w-[220px]">
                                Tanggal Update
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.map(
                            (item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                                >
                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.perihal
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.no_registrasi
                                        }
                                    </td>

                                    <td className="p-4 min-w-[350px] text-slate-900">
                                        {
                                            item.no_arsip
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.tanggal_registrasi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.pic_registrasi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.no_box
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.divisi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.sumber
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.tanggal_diarsipkan
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.unit_fungsi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.unit_umum
                                        }
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${getStatusColor(
                                                item.status_registrasi
                                            )}`}
                                        >
                                            {
                                                item.status_registrasi
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.status_arsip
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.status_inisiasi
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.format
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {
                                            item.document_type
                                        }
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-slate-900">
                                        {new Date(
                                            item.tanggal_registrasi
                                        ).toLocaleDateString(
                                            "id-ID"
                                        )}
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
                    {paginatedData.length} data
                </p>

                <div className="flex items-center gap-2">
                    <button
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
                        }
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {Array.from({
                        length: totalPages,
                    }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrentPage(
                                    index + 1
                                )
                            }
                            className={`rounded-lg px-3 py-1 text-sm ${currentPage ===
                                index + 1
                                ? "bg-slate-900 text-white"
                                : "border border-slate-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

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
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}