"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

type Props = {
    data: {
        status: string;
        total: number;
    }[];
};

const COLORS = [
    "#2563eb",
    "#9333ea",
    "#f59e0b",
    "#06b6d4",
];

export default function StatusDonutChart({
    data,
}: Props) {

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5">

                <h2 className="text-lg font-semibold text-slate-800">
                    Distribusi Status Arsip Ditolak/Gagal
                </h2>

                <p className="text-sm text-slate-500">
                    Persentase workflow arsip
                </p>

            </div>

            <div className="h-[350px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="status"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                        >

                            {data.map(
                                (
                                    _,
                                    index
                                ) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}