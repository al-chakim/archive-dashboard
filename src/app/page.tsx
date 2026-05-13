import ArchiveTable from "@/components/archive-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import StatCard from "@/components/stat-card";

export default function HomePage() {
  return (
    <div className="flex bg-slate-100 min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <Navbar />

        <main className="p-4 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            <StatCard
              title="Total Arsip"
              total="12.540"
              bgColor="bg-blue-500"
            />

            <StatCard
              title="Arsip Aktif"
              total="8.210"
              bgColor="bg-green-500"
            />

            <StatCard
              title="Pending"
              total="1.240"
              bgColor="bg-amber-500"
            />

            <StatCard
              title="User Aktif"
              total="152"
              bgColor="bg-purple-500"
            />

            <StatCard
              title="Ditolak"
              total="27"
              bgColor="bg-red-500"
            />
          </div>

        </main>
      </div>
    </div>
  );
}