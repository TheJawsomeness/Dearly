
import { getSiteSettings } from "./services/settingsService.js";
import { getCounter, incrementCounter } from "./services/counterService.js";

async function loadLogo() {
    try {
        const longlogo = await getSiteSettings("long_logo_url");

        document.getElementById("logo").src = longlogo;
    } catch (error) {
        console.error("Failed to load logo:", error);
    }
}

const counterDisplay = document.querySelector("#counter");
const incrementButton = document.querySelector("#increment-button")

async function loadCounter(params) {
    const count = await getCounter();
    counterDisplay.textContent = count;
}

loadLogo();
loadCounter();

incrementButton.addEventListener("click", async () => {
    incrementButton.disabled = true;

    try{
        const newCount = await incrementCounter();
        counterDisplay.textContent = newCount
    } catch (error) {
        console.error("Failed to increment", error);
    } finally {
        incrementButton.disabled = false;
    }
});