import ArchiveTable from "@/components/archive-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import StatCard from "@/components/stat-card";
import StatusChart from "@/components/status-chart";

export default function HomePage() {
    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            {/* SIDEBAR */}
            <Sidebar />

            {/* CONTENT */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* NAVBAR FIXED */}
                <Navbar />

                {/* SCROLL AREA */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                        <StatCard
                            title="Total Dokumen"
                            total="12.540"
                            bgColor="bg-violet-500"
                        />

                        <StatCard
                            title="Permohonan Registrasi/Registrasi Masuk"
                            total="1.240"
                            bgColor="bg-blue-500"
                        />

                        <StatCard
                            title="Verifikasi Arsip"
                            total="8.210"
                            bgColor="bg-fuchsia-500"
                        />

                        <StatCard
                            title="Verifikasi Command Center"
                            total="152"
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Verifikasi Unit Umum"
                            total="27"
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Siap Dijemput"
                            total="55"
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Scheduled"
                            total="605"
                            bgColor="bg-slate-500"
                        />

                        <StatCard
                            title="Ready to Pick Up"
                            total="680"
                            bgColor="bg-purple-500"
                        />

                        <StatCard
                            title="Pick Up"
                            total="5"
                            bgColor="bg-purple-500"
                        />

                        <StatCard
                            title="On Location"
                            total="1504"
                            bgColor="bg-amber-500"
                        />

                        <StatCard
                            title="Dokumen Diarsipkan"
                            total="118530"
                            bgColor="bg-green-500"
                        />

                        <StatCard
                            title="Permohonan Ditolak"
                            total="55"
                            bgColor="bg-red-500"
                        />

                        <StatCard
                            title="Ditolak Command Center"
                            total="125"
                            bgColor="bg-red-500"
                        />

                        <StatCard
                            title="Permohonan Ditolak"
                            total="15"
                            bgColor="bg-red-500"
                        />

                        <StatCard
                            title="Pickup Failed"
                            total="4"
                            bgColor="bg-red-500"
                        />
                    </div>

                    <StatusChart />

                </main>
            </div>
        </div>
    );
}