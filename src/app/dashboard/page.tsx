import StatCard from "@/components/stat-card"
import { getTotalArchives } from "@/lib/queries"

export default async function DashboardPage() {
    const total = await getTotalArchives()

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            <StatCard
                title="Total Arsip"
                value={total.total}
            />
        </div>
    )
}