"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const data = [
    {
        status: "Permohonan Registrasi",
        total: 125,
    },

    {
        status: "Registrasi Masuk",
        total: 98,
    },

    {
        status: "Verifikasi Command Center",
        total: 76,
    },

    {
        status: "Schedule",
        total: 52,
    },

    {
        status: "Ready to Pick Up",
        total: 41,
    },

    {
        status: "Picked Up",
        total: 33,
    },

    {
        status: "On Location",
        total: 29,
    },

    {
        status: "Diarsipkan",
        total: 210,
    },

    {
        status: "Permohonan Ditolak",
        total: 17,
    },

    {
        status: "Ditolak Command Center",
        total: 9,
    },

    {
        status: "Ditolak Unit Umum",
        total: 2,
    },
];

export default function StatusChart() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-6 p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Statistik Status Registrasi
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Monitoring status proses arsip
                </p>
            </div>

            <div className="w-full h-[500px] text-slate-700">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 10,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis type="number" />

                        <YAxis
                            type="category"
                            dataKey="status"
                            width={180}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="total"
                            radius={[0, 8, 8, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}