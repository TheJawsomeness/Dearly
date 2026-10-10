import { supabase } from "../config/supabase.js";

export async function fetchFromSupabase(table,columns = "*",row = 0) {
    const { data, error } = await supabase
        .from(table)
        .select(columns);

    if (error) {
        throw error;
    }

    return data[row][columns];
}

