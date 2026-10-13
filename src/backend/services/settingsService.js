import { fetchFromSupabase } from "../utils/api.js";

export async function getSiteSettings(column) {
    const row = 0;
    const settings = await fetchFromSupabase(
        "site_settings",
        column,
    );

    console.log(settings[row][column]);

    return settings[row][column];
}