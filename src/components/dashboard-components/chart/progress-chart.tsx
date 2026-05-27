"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

type Props = {
    data: {
        month: string;

        scheduled: number;

        ready_to_pick_up: number;

        siap_dijemput_unit_umum: number;

        dijemput_unit_umum: number;

        on_location: number;
    }[];
};

export default function ProgressWorkflowChart({
    data,
}: Props) {

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* HEADER */}
            <div className="mb-5">

                <h2 className="text-lg font-semibold text-slate-800">
                    Workflow Penjemputan Arsip
                </h2>

                <p className="text-sm text-slate-500">
                    Monitoring proses pickup arsip per bulan
                </p>

            </div>

            {/* CHART */}
            <div className="h-[350px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

                        <Tooltip
                            cursor={{
                                fill: "transparent",
                            }}
                        />

                        <Legend
                            formatter={(value) => (
                                <span className="text-sm font-medium text-slate-800">
                                    {value}
                                </span>
                            )}
                        />

                        {/* SCHEDULED */}
                        <Bar
                            dataKey="scheduled"
                            stackId="a"
                            fill="#f59e0b"
                            name="Scheduled"
                            radius={[0, 0, 0, 0]}
                        />

                        {/* READY TO PICK UP */}
                        <Bar
                            dataKey="ready_to_pick_up"
                            stackId="a"
                            fill="#06b6d4"
                            name="Ready To Pick Up"
                            radius={[0, 0, 0, 0]}
                        />

                        {/* SIAP DIJEMPUT */}
                        <Bar
                            dataKey="siap_dijemput_unit_umum"
                            stackId="a"
                            fill="#8b5cf6"
                            name="Siap Dijemput Unit Umum"
                            radius={[0, 0, 0, 0]}
                        />

                        {/* DIJEMPUT */}
                        <Bar
                            dataKey="dijemput_unit_umum"
                            stackId="a"
                            fill="#10b981"
                            name="Dijemput Unit Umum"
                            radius={[0, 0, 0, 0]}
                        />

                        {/* ON LOCATION */}
                        <Bar
                            dataKey="on_location"
                            stackId="a"
                            fill="#ef4444"
                            name="On Location"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}