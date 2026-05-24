import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import HistoriTable from "@/components/history-table";

import {
    getArchiveHistory,
} from "@/lib/queries/archive-history";

type Props = {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
        status?: string;
        startDate?: string;
        endDate?: string;
    }>;
};

export default async function HistoriArsipPage({
    searchParams,
}: Props) {

    const params =
        await searchParams;

    const page =
        Number(params.page) > 0
            ? Number(params.page)
            : 1;

    const limit =
        Number(params.limit) > 0
            ? Number(params.limit)
            : 5;

    const result =
        await getArchiveHistory({
            page,
            limit,
            search:
                params.search || "",

            status:
                params.status || "",

            startDate:
                params.startDate || "",

            endDate:
                params.endDate || "",
        });

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar />

                <main className="flex-1 overflow-y-auto p-4">

                    <HistoriTable
                        data={result.data}
                        totalPages={result.totalPages}
                        currentPage={result.currentPage}
                        totalData={result.totalData}
                    />

                </main>

            </div>

        </div>
    );
}