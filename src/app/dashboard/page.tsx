import DashboardTable from "@/components/dashboard-components/dashboard-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import StatCard from "@/components/dashboard-components/stat-card";

import RegistrationChart from "@/components/dashboard-components/chart/registration-chart";
import StatusDonutChart from "@/components/dashboard-components/chart/status-donut-chart";

import { getDashboardStats } from "@/lib/queries/archive-total";
import {
    getRegistrationChart,
    getStatusDistribution,
} from "@/lib/queries/chart/registration-chart";

export default async function HomePage() {
    const stats = await getDashboardStats();

    const [
        registrationChart,
        statusDistribution,
    ] = await Promise.all([
        getRegistrationChart(),
        getStatusDistribution(),
    ]);

    const totalAllStatus =
        statusDistribution.reduce(
            (acc, item) =>
                acc + item.total,
            0
        );

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

                    {/* DONUT + DETAIL */}
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">

                        {/* LEFT */}
                        <div className="h-full">
                            <StatusDonutChart
                                data={statusDistribution}
                            />
                        </div>

                        {/* RIGHT */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 text-lg font-semibold text-slate-800">
                                Detail Status Arsip Ditolak/Gagal
                            </h2>

                            <div className="space-y-5">

                                {statusDistribution.map(
                                    (item, index) => {

                                        const totalAll =
                                            statusDistribution.reduce(
                                                (acc, curr) =>
                                                    acc + curr.total,
                                                0
                                            );

                                        const percentage =
                                            (
                                                item.total /
                                                totalAll
                                            ) * 100;

                                        return (

                                            <div key={index}>

                                                <div className="mb-2 flex items-center justify-between">

                                                    <span className="text-sm text-slate-700">
                                                        {item.status}
                                                    </span>

                                                    <span className="text-sm font-semibold text-slate-900">
                                                        {item.total.toLocaleString()}
                                                    </span>

                                                </div>

                                                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                                                    <div
                                                        className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />

                                                </div>

                                                <p className="mt-1 text-right text-xs text-slate-500">
                                                    {percentage.toFixed(1)}%
                                                </p>

                                            </div>

                                        );
                                    }
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