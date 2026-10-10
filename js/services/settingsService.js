import { fetchFromSupabase } from "../utils/api.js";

export async function getSiteSettings(column,row =0) {
    const settings = await fetchFromSupabase(
        "site_settings",
        column,
        row
    );

    console.log(settings);

    return settings;
}