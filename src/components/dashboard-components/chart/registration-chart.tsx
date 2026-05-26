"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

type Props = {
    data: {
        month: string;

        permohonan_registrasi: number;

        registrasi_masuk: number;

        registrasi_masuk_lanjutan: number;
    }[];
};

export default function RegistrationChart({
    data,
}: Props) {

    return (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* HEADER */}
            <div className="mb-5">

                <h2 className="text-lg font-semibold text-slate-800">
                    Trend Registrasi Arsip
                </h2>

                <p className="text-sm text-slate-500">
                    Perbandingan status registrasi per bulan
                </p>

            </div>

            {/* CHART */}
            <div className="h-[380px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart data={data}>

                        <defs>

                            {/* BLUE */}
                            <linearGradient
                                id="permohonanColor"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#2563eb"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#2563eb"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                            {/* GREEN */}
                            <linearGradient
                                id="masukColor"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#16a34a"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#16a34a"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                            {/* ORANGE */}
                            <linearGradient
                                id="lanjutanColor"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#ea580c"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#ea580c"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        {/* PERMOHONAN */}
                        <Area
                            type="monotone"
                            dataKey="permohonan_registrasi"
                            stroke="#2563eb"
                            fill="url(#permohonanColor)"
                            strokeWidth={3}
                        />

                        {/* MASUK */}
                        <Area
                            type="monotone"
                            dataKey="registrasi_masuk"
                            stroke="#16a34a"
                            fill="url(#masukColor)"
                            strokeWidth={3}
                        />

                        {/* LANJUTAN */}
                        <Area
                            type="monotone"
                            dataKey="registrasi_masuk_lanjutan"
                            stroke="#ea580c"
                            fill="url(#lanjutanColor)"
                            strokeWidth={3}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}