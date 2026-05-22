import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import StatCard from "@/components/stat-card";

import { getDashboardStats } from "@/lib/queries/archive-total";

export default async function HomePage() {
    const stats = await getDashboardStats();

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">
            {/* SIDEBAR */}
            <Sidebar />

            {/* CONTENT */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* NAVBAR */}
                <Navbar />

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">

                        <StatCard
                            title="Total Dokumen"
                            total={Number(
                                stats.total_dokumen
                            ).toLocaleString("id-ID")}
                            bgColor="bg-violet-500"
                        />

                        <StatCard
                            title="Permohonan Registrasi / Registrasi Masuk"
                            total={Number(
                                stats.registrasi_masuk
                            ).toLocaleString("id-ID")}
                            bgColor="bg-blue-500"
                        />

                        <StatCard
                            title="Verifikasi Arsip"
                            total={Number(
                                stats.verifikasi_arsip
                            ).toLocaleString("id-ID")}
                            bgColor="bg-fuchsia-500"
                        />

                        <StatCard
                            title="Verifikasi Command Center"
                            total={Number(
                                stats.verifikasi_command_center
                            ).toLocaleString("id-ID")}
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Verifikasi Unit Umum"
                            total={Number(
                                stats.verifikasi_unit_umum
                            ).toLocaleString("id-ID")}
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Siap Dijemput"
                            total={Number(
                                stats.siap_dijemput
                            ).toLocaleString("id-ID")}
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Scheduled"
                            total={Number(
                                stats.scheduled
                            ).toLocaleString("id-ID")}
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Ready To Pick Up"
                            total={Number(
                                stats.ready_to_pickup
                            ).toLocaleString("id-ID")}
                            bgColor="bg-purple-500"
                        />

                        <StatCard
                            title="Pick Up"
                            total={Number(
                                stats.pickup
                            ).toLocaleString("id-ID")}
                            bgColor="bg-purple-500"
                        />

                        <StatCard
                            title="On Location"
                            total={Number(
                                stats.on_location
                            ).toLocaleString("id-ID")}
                            bgColor="bg-amber-500"
                        />

                        <StatCard
                            title="Dokumen Diarsipkan"
                            total={Number(
                                stats.diarsipkan
                            ).toLocaleString("id-ID")}
                            bgColor="bg-green-500"
                        />

                        <StatCard
                            title="Permohonan Ditolak"
                            total={Number(
                                stats.permohonan_ditolak
                            ).toLocaleString("id-ID")}
                            bgColor="bg-red-500"
                        />

                        <StatCard
                            title="Ditolak Command Center"
                            total={Number(
                                stats.ditolak_command_center
                            ).toLocaleString("id-ID")}
                            bgColor="bg-red-500"
                        />

                        <StatCard
                            title="Ditolak Unit Umum"
                            total={Number(
                                stats.ditolak_unit_umum
                            ).toLocaleString("id-ID")}
                            bgColor="bg-red-500"
                        />

                        <StatCard
                            title="Pickup Failed"
                            total={Number(
                                stats.pickup_failed
                            ).toLocaleString("id-ID")}
                            bgColor="bg-red-500"
                        />

                    </div>
                </main>
            </div>
        </div>
    );
}