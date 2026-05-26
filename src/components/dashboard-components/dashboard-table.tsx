type Props = {
    stats: {
        permohonan_registrasi: number;
        registrasi: number;
        registrasi_masuk_lanjutan: number;
        verifikasi_unit_umum: number;
        verifikasi_command_center: number;
        siap_dijemput: number;
        scheduled: number;
        ready_to_pickup: number;
        pickup: number;
        on_location: number;
        permohonan_ditolak: number;
        ditolak_command_center: number;
        ditolak_unit_umum: number;
        pickup_failed: number;
    };
};

export default function DashboardTable({ stats }: Props) {
    const formatNumber = (value: number) => {
        return Number(value).toLocaleString("id-ID");
    };

    const statusData = [
        { label: "Permohonan Registrasi", value: stats.permohonan_registrasi },
        { label: "Registrasi Masuk", value: stats.registrasi },
        { label: "Registrasi Masuk Lanjutan", value: stats.registrasi_masuk_lanjutan },
        { label: "Verifikasi Command Center", value: stats.verifikasi_command_center },
        { label: "Verifikasi Unit Umum", value: stats.verifikasi_unit_umum },
        { label: "Siap Dijemput", value: stats.siap_dijemput },
        { label: "Scheduled", value: stats.scheduled },
        { label: "Ready To Pick Up", value: stats.ready_to_pickup },
        { label: "Pick Up", value: stats.pickup },
        { label: "On Location", value: stats.on_location },
        { label: "Permohonan Ditolak", value: stats.permohonan_ditolak },
        { label: "Ditolak Command Center", value: stats.ditolak_command_center },
        { label: "Ditolak Unit Umum", value: stats.ditolak_unit_umum },
        { label: "Pick Up Failed", value: stats.pickup_failed },
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-4">
            <div className="border-b border-slate-200 px-5 py-3 bg-slate-50">
                <h2 className="font-semibold text-slate-700">Rincian Status Registrasi</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-600">
                    <thead className="bg-slate-200 text-slate-700 text-left">
                        <tr>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3 text-right">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-300">
                        {statusData.map((item, index) => (
                            <tr key={index}>
                                <td className="px-5 py-3">{item.label}</td>
                                <td className="px-5 py-3 text-right font-medium">
                                    {formatNumber(item.value)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}