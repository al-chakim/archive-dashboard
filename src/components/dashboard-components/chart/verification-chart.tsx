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
        verifikasi_command_center: number;
        verifikasi_unit_umum: number;
    }[];
};

export default function VerificationChart({
    data,
}: Props) {

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* HEADER */}
            <div className="mb-5">

                <h2 className="text-lg font-semibold text-slate-800">
                    Workflow Verifikasi Arsip
                </h2>

                <p className="text-sm text-slate-500">
                    Perbandingan proses verifikasi per bulan
                </p>

            </div>

            {/* CHART */}
            <div className="h-[280px] w-full">

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

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="verifikasi_command_center"
                            stackId="a"
                            fill="#8b5cf6"
                            radius={[0, 0, 4, 4]}
                            name="Verifikasi Command Center"
                        />

                        <Bar
                            dataKey="verifikasi_unit_umum"
                            stackId="a"
                            fill="#06b6d4"
                            radius={[4, 4, 0, 0]}
                            name="Verifikasi Unit Umum"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}