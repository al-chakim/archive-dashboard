"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },

        {
            name: "Registrasi Arsip",
            path: "/registrasi-arsip",
        },

        {
            name: "Monitoring Registrasi",
            path: "/monitoring-registrasi",
        },

        {
            name: "Histori Arsip",
            path: "/histori-arsip",
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white">
            {/* HEADER */}
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-2xl font-bold">
                    Dash - ELARCH
                </h1>

                <p className="text-sm text-slate-400 mt-1">
                    Archive Dashboard
                </p>
            </div>

            {/* MENU */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {menus.map((menu) => {
                        const isActive =
                            pathname === menu.path;

                        return (
                            <li key={menu.path}>
                                <Link
                                    href={menu.path}
                                    className={`
                                        block
                                        p-3
                                        rounded-lg
                                        transition
                                        
                                        ${isActive
                                            ? "bg-slate-800 text-white"
                                            : "hover:bg-slate-800 text-slate-300"
                                        }
                                    `}
                                >
                                    {menu.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}