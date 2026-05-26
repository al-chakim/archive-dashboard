import DashboardTable from "@/components/dashboard-components/dashboard-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import StatCard from "@/components/dashboard-components/stat-card";

import RegistrationChart from "@/components/dashboard-components/registration-chart";
import StatusDonutChart from "@/components/dashboard-components/status-donut-chart";

import { getDashboardStats } from "@/lib/queries/archive-total";
import {
    getRegistrationChart,
    getStatusDistribution,
} from "@/lib/queries/dashboard-chart";

export default async function HomePage() {
    const stats = await getDashboardStats();

    const [
        registrationChart,
        statusDistribution,
    ] = await Promise.all([
        getRegistrationChart(),
        getStatusDistribution(),
    ]);

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

                    {/* LINE CHART */}
                    <div className="mb-6">

                        <RegistrationChart
                            data={
                                registrationChart
                            }
                        />

                    </div>

                    {/* DONUT CHART */}
                    <div className="mb-6">

                        <StatusDonutChart
                            data={
                                statusDistribution
                            }
                        />

                        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 text-lg font-semibold text-slate-800">
                                Detail Status Arsip
                            </h2>

                            <div className="space-y-4">

                                {statusDistribution.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                        >

                                            <div className="mb-1 flex items-center justify-between text-sm">

                                                <span className="text-slate-700">
                                                    {
                                                        item.status
                                                    }
                                                </span>

                                                <span className="font-semibold text-slate-900">
                                                    {
                                                        item.total
                                                    }
                                                </span>

                                            </div>

                                            <div className="h-3 rounded-full bg-slate-200">

                                                <div
                                                    className="h-3 rounded-full bg-blue-500"
                                                    style={{
                                                        width: `${Math.min(
                                                            item.total /
                                                            10,
                                                            100
                                                        )}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                    <DashboardTable stats={stats} />
                </main>
            </div>
        </div>
    );
}