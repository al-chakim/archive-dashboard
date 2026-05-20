import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ELARCH Dashboard",
    description: "Archive Dashboard System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className="bg-slate-100 text-slate-900">
                {children}
            </body>
        </html>
    );
}