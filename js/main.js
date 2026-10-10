
import { getSiteSettings } from "./services/settingsService.js";

async function loadLogo() {
    try {
        const settings = await getSiteSettings();

        document.getElementById("logo").src = settings.logo_url;
    } catch (error) {
        console.error("Failed to load logo:", error);
    }
}

loadLogo();
