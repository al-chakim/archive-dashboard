type Props = {
    title: string;
    total: string;
    bgColor: string;
};

export default function StatCard({
    title,
    total,
    bgColor,
}: Props) {
    return (
        <div className={`rounded-xl font-medium border p-6 shadow-sm ${bgColor}`}>
            <h2 className="text-slate-200 text-base">
                {title}
            </h2>

            <p className="text-3xl font-bold mt-2 text-slate-100">
                {total}
            </p>
        </div>
    );
}