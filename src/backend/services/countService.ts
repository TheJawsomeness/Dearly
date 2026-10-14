import { supabase } from "../config/supabase";

export async function getCount() {
    const {data, error} = await supabase.from("user_counts").select("count")
   if(error) throw error

   return data[0].count
}