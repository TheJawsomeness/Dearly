
import { getSiteSettings } from "./services/settingsService.js";
import { signUp, logIn, logOut, getCurrentUser } from "./services/authService.js";

import { getCounter, incrementCounter, listenToCounter } from "./services/counterService.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/style.css";

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

const authForm = document.querySelector("#auth-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

const authMessage = document.querySelector("#auth-message");
const authMessageDiv = document.querySelector("#auth-message-div");
const accountSection = document.querySelector("#account-section");
const userEmail = document.querySelector("#user-email");
const logoutButton = document.querySelector("#logout-button");

function showUser(user) {
    const loggedIn = Boolean(user);

    accountSection.hidden = !loggedIn;
    userEmail.textContent = loggedIn ? user.email : "";

    authForm.hidden = loggedIn;

    incrementButton.hidden = !loggedIn;
}

authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const action = event.submitter.value;

    if(action == "login"){
       try{
            const data = await logIn(email,password);

            showUser(data.user);
            authMessage.textContent = "Logged in successfully";
        }catch(error){
            authMessage.textContent = error.message;
        }
    }else if(action == "signup"){
        try {
            const data = await signUp(email, password);

            if (data.session) {
                showUser(data.user);
                authMessage.textContent = "Account created and logged in!";
            } else {
                authMessage.textContent =
                    "Account created! Check your email to confirm it, then log in.";
            }

            authForm.reset();
        } catch (error) {
            authMessage.textContent = error.message;
        }
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