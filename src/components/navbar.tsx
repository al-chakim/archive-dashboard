"use client";

// @ts-ignore: no type declarations for js-cookie in this project
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove(
            "isLoggedIn"
        );

        router.push("/login");
    };

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
            {/* LEFT */}
            <div>
                <h1 className="text-xl font-semibold text-slate-800">
                    Dashboard ELARCH
                </h1>

                <p className="text-sm text-slate-500">
                    Archive Monitoring System
                </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
                {/* USER INFO */}
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">
                        Admin
                    </p>

                    <p className="text-xs text-slate-500">
                        Administrator
                    </p>
                </div>

                {/* AVATAR */}
                {/* <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold">
                    A
                </div> */}

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}