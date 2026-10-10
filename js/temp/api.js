import { SUPABASE_URL, SUPABASE_KEY } from "../config/supabase.js";

export async function fetchFromSupabase(table, query) {
    const url = `${SUPABASE_URL}/rest/v1/${table}?${query}`;

    const response = await fetch(url, {
        headers: {
            apikey: SUPABASE_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`Supabase request failed: ${response.status}`);
    }

    return await response.json();
}
