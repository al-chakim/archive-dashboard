import DashboardTable from "@/components/dashboard-components/dashboard-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import StatCard from "@/components/dashboard-components/stat-card";

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
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Total Dokumen"
                            total={Number(
                                stats.total_dokumen
                            ).toLocaleString("id-ID")}
                            bgColor="bg-violet-500"
                        />

                        <StatCard
                            title="Dokumen Diarsipkan"
                            total={Number(
                                stats.diarsipkan
                            ).toLocaleString("id-ID")}
                            bgColor="bg-green-500"
                        />

                        <StatCard
                            title="In Progress"
                            total={Number(
                                stats.in_progress
                            ).toLocaleString("id-ID")}
                            bgColor="bg-cyan-500"
                        />

                        <StatCard
                            title="Ditolak/Gagal"
                            total={Number(
                                stats.ditolak
                            ).toLocaleString("id-ID")}
                            bgColor="bg-red-500"
                        />
                    </div>

                    <DashboardTable stats={stats} />
                </main>
            </div>
        </div>
    );
}