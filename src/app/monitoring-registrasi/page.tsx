import ArchiveTable from "@/components/archive-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function Monres() {
    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4">
                    <ArchiveTable />
                </main>
            </div>
        </div>
    );
}
