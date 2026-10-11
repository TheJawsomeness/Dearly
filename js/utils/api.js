
import { supabase } from "../config/supabase.js";

export async function fetchFromSupabase(table, columns = "*") {
    const { data, error } = await supabase
        .from(table)
        .select(columns);

    if (error) {
        throw error;
    }

    return data;
}

export async function updateToSupabase(table, values, match) {
    const { data, error } = await supabase
        .from(table)
        .update(values)
        .match(match)
        .select();

    if (error) {
        throw error;
    }

    return data;
}
