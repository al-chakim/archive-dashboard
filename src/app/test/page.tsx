import { db } from "@/lib/db";

export default async function TestPage() {
    const result = await db.query(`
        SELECT NOW()
    `);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">
                Database Connected
            </h1>

            <pre className="mt-4">
                {JSON.stringify(
                    result.rows,
                    null,
                    2
                )}
            </pre>
        </div>
    );
}