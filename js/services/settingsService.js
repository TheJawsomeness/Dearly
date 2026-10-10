
import { fetchFromSupabase } from "../utils/api.js";

export async function getSiteSettings() {
    const settings = await fetchFromSupabase(
        "site_settings",
        "select=logo_url"
    );

    return settings[0];
}
