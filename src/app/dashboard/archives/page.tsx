import ArchiveTable from "@/components/archive-table"
import { getArchives } from "@/lib/queries"

export default async function ArchivePage() {
    const archives = await getArchives()

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Data Arsip
            </h1>

            <ArchiveTable data={archives} />
        </div>
    )
}