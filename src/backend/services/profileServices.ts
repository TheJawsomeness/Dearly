import { supabase } from "../config/supabase";

export async function getProfiles() {
    const {data, error} = await supabase
        .from("profiles")
        .select("*")

    if(error) throw error;

    return data
}

export async function getProfileByUUID(uuid:string) {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name")
        .eq("id", uuid)
        .single();

    if (error) throw error;

    return data;
}

export async function getProfileNameByUUID(uuid:string) {
    const data = await getProfileByUUID(uuid)
    return data.display_name as string;
}