import ArchiveTable from "@/components/archive-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function Monres() {
    return (
        <div className="flex bg-slate-100 min-h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 overflow-hidden">
                <Navbar />
                <main className="p-4 overflow-hidden">
                    <ArchiveTable />
                </main>
            </div>
        </div>
    );
}
