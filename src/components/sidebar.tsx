"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faFileAlt,
    faChartLine,
    faHistory,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: faTachometerAlt,
        },
        {
            name: "Registrasi Arsip",
            path: "/registrasi-arsip",
            icon: faFileAlt,
        },
        {
            name: "Monitoring Registrasi",
            path: "/monitoring-registrasi",
            icon: faChartLine,
        },
        {
            name: "Histori Arsip",
            path: "/histori-arsip",
            icon: faHistory,
        },
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside
            className={`relative flex flex-col bg-slate-900 text-white transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"
                } min-h-screen`}
        >
            {/* Tombol Toggle */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white shadow-md hover:bg-slate-600 focus:outline-none"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className="text-xs" />
            </button>

            {/* HEADER */}
            <div
                className={`border-b border-slate-700 p-4 ${isCollapsed ? "px-2 text-center" : "px-6"
                    }`}
            >
                <h1 className={`font-bold ${isCollapsed ? "text-lg" : "text-2xl"}`}>
                    {isCollapsed ? "DE" : "Dash - ELARCH"}
                </h1>
                {!isCollapsed && (
                    <p className="mt-1 text-sm text-slate-400">Archive Dashboard</p>
                )}
            </div>

            {/* MENU */}
            <nav className="flex-1 p-2">
                <ul className="space-y-2">
                    {menus.map((menu) => {
                        const isActive = pathname === menu.path;

                        return (
                            <li key={menu.path}>
                                <Link
                                    href={menu.path}
                                    className={`
                                            flex items-center gap-3 rounded-lg p-3 transition
                                            ${isActive
                                            ? "bg-slate-800 text-white"
                                            : "text-slate-300 hover:bg-slate-800"
                                        }
                                            ${isCollapsed ? "justify-center" : "justify-start"}
                                        `}
                                    title={isCollapsed ? menu.name : undefined}
                                >
                                    <FontAwesomeIcon icon={menu.icon} className="text-lg" />
                                    {!isCollapsed && <span>{menu.name}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}