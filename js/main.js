
import { getSiteSettings } from "./services/settingsService.js";
import { signUp, logIn, logOut, getCurrentUser } from "./services/authService.js";

import { getCounter, incrementCounter, listenToCounter } from "./services/counterService.js";

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
    } catch (error) {
        console.error("Failed to increment", error);
    } finally {
        incrementButton.disabled = false;
    }
});

listenToCounter((count) => {
    counterDisplay.textContent = count;
})

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const authMessage = document.querySelector("#auth-message");
const accountSection = document.querySelector("#account-section");
const userEmail = document.querySelector("#user-email");
const logoutButton = document.querySelector("#logout-button");

function showUser(user) {
    const loggedIn = Boolean(user);

    accountSection.hidden = !loggedIn;
    userEmail.textContent = loggedIn ? user.email : "";

    signupForm.hidden = loggedIn;
    loginForm.hidden = loggedIn;

    incrementButton.hidden = !loggedIn;
}

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    try {
        const data = await signUp(email, password);

        if (data.session) {
            showUser(data.user);
            authMessage.textContent = "Account created and logged in!";
        } else {
            authMessage.textContent =
                "Account created! Check your email to confirm it, then log in.";
        }

        signupForm.reset();
    } catch (error) {
        authMessage.textContent = error.message;
    }
});

loginForm.addEventListener("submit", async(event) => {
    event.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    try{
        const data = await logIn(email,password);

        showUser(data.user);
        authMessage.textContent = "Logged in successfully";
    }catch(error){
        authMessage.textContent = error.message;
    }
});

logoutButton.addEventListener("click", async () => {
    try {
        await logOut();
        showUser(null);
        authMessage.textContent = "You have logged out.";
    } catch (error) {
        authMessage.textContent = error.message;
    }
});

async function checkSession() {
    try {
        const user = await getCurrentUser();
        showUser(user);
    } catch (error) {
        console.error("Could not check session:", error);
        showUser(null);
    }
}

checkSession();