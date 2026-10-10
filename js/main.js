
import { getSiteSettings } from "./services/settingsService.js";

async function loadLogo() {
    try {
        const longlogo = await getSiteSettings("long_logo_url");

        document.getElementById("logo").src = longlogo;
    } catch (error) {
        console.error("Failed to load logo:", error);
    }
}

loadLogo();
