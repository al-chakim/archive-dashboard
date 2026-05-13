import { query } from "@/lib/db";

export default async function TestPage() {
    const result = await query(`
    SELECT NOW()
  `);

    return (
        <div>
            {JSON.stringify(result.rows)}
        </div>
    );
}