import HistoriTable from "@/components/history-table";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getArchiveHistories } from "@/lib/queries/archive-history";

export default async function HisArsip() {
    const data = await getArchiveHistories();

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4">

                    <HistoriTable data={data} />

                </main>
            </div>
        </div>
    );
}