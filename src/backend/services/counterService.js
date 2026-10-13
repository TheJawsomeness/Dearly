import { fetchFromSupabase, updateToSupabase } from "../utils/api.js";
import { supabase } from "../config/supabase.js";

const table = "click_counter";
const column = "count";

export async function getCounter() {
    const row = 0;
    const settings = await fetchFromSupabase(
        table,
        column
    );

    console.log(settings[row][column]);

    return settings[row][column];
}

export async function incrementCounter() {
    const { data, error } = await supabase.rpc("increment_counter");

    if (error) throw error;

    console.log("RPC data:", data);
    return data;
}


export function listenToCounter(callback) {
    const channel = supabase
        .channel("counter-changes")
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "click_counter",
                filter: "id=eq.1"
            },
            (payload) => {
                callback(payload.new.count);
            }
        )
        .subscribe();

    return () => {
        void supabase.removeChannel(channel);
    }
}
