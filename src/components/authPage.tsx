import { FormEvent, useState } from "react";
import Button from "./button";
import Logo from "./logo";
import Icon from "./icon";

import { View } from "./const/types";
import { logIn, signUp } from "../backend/services/authService";
import { User } from "@supabase/supabase-js";

export default function AuthPage({
  mode,
  navigate,
  authenticate,
  count,
}: {
  mode: "login" | "register";
  navigate: (view: View) => void;
  authenticate: (user: User) => void;
  count: number;
}) {
  const isRegister = mode === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState("");

  function showAlert(message: string, type: "error" | "info" = "error") {
    setError(type === "error" ? message : "");
    setInfo(type === "info" ? message : "");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    showAlert("");
    if (isRegister && name.trim().length < 2) {
      showAlert("Please enter your name so neighbors know who you are.");
      return;
    }
    if (!email.includes("@")) {
      showAlert("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      showAlert("Password must be at least 6 characters.");
      return;
    }
    if (isRegister && password !== confirm) {
      showAlert("Those passwords don’t match. Please try again.");
      return;
    }

    if (!isRegister) {
      setBusy(true);

      try {
        const authData = await logIn(email, password);
        authenticate(authData.user);
      } catch (error) {
        showAlert(error instanceof Error ? error.message : "Login failed.");
      } finally {
        setBusy(false);
      }
    } else if (isRegister) {
      setBusy(true);
      try {
        const authData = await signUp(email, password, name);
        if (!authData.session) {
          showAlert(
            "Sign Up Successful. Check Email for Confirmation.",
            "info",
          );
          navigate("login");
        } else if (authData.session && authData.user) {
          authenticate(authData.user);
        }
      } catch (error) {
        showAlert(
          error instanceof Error
            ? error.message
            : "Sign Up failed. Try Again Later",
        );
      } finally {
        setBusy(false);
      }
    }
  }

  return (
    <main className="auth-main">
      <section className="auth-intro">
        <div className="eyebrow">
          <Icon name="users" /> Your neighborhood, online
        </div>
        <h1>
          {isRegister
            ? "Come join the conversation."
            : "Welcome back, neighbor."}
        </h1>
        <p>
          Share what’s happening, ask for a hand, and stay connected with the
          people around you.
        </p>
        <div className="community-note">
          {/* <div className="avatar-stack" aria-hidden="true">
            <span className="avatar coral">MC</span>
            <span className="avatar sky">OB</span>
            <span className="avatar violet">PS</span>
          </div> */}
          <span>
            <strong>{count} neighbors</strong> are already on dearly
          </span>
        </div>
      </section>

      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-heading">
          <span className="auth-icon">
            <Icon name={isRegister ? "pen" : "lock"} />
          </span>
          <div>
            <h2 id="auth-title">
              {isRegister ? "Create your account" : "Log in to dearly"}
            </h2>
            <p>
              {isRegister
                ? "It only takes a minute to get started."
                : "Enter your details to continue."}
            </p>
          </div>
        </div>
        {error && (
          <div className="form-error" role="alert">
            <span>!</span>
            {error}
          </div>
        )}
        {info && (
          <div className="form-info" role="alert">
            <span>?</span>
            {info}
          </div>
        )}
        <form onSubmit={submit} noValidate>
          {isRegister && (
            <label className="field">
              <span>Username</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                placeholder="Your Nickname"
              />
            </label>
          )}
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <span className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={isRegister ? "new-password" : "current-password"}
                placeholder={
                  isRegister ? "At least 6 characters" : "Enter your password"
                }
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon name="eye" />
              </button>
            </span>
          </label>
          {isRegister && (
            <label className="field">
              <span>Confirm password</span>
              <input
                type="password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                autoComplete="new-password"
                placeholder="Enter it once more"
              />
            </label>
          )}
          <Button type="submit" className="submit-button" disabled={busy}>
            {busy ? (
              <>
                <span className="spinner" />{" "}
                {isRegister ? "Creating account…" : "Logging in…"}
              </>
            ) : (
              <>
                {isRegister ? "Create account" : "Log in"} <Icon name="arrow" />
              </>
            )}
          </Button>
        </form>
        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "New to dearly?"}{" "}
          <button onClick={() => navigate(isRegister ? "login" : "register")}>
            {isRegister ? "Log in" : "Create an account"}
          </button>
        </p>
      </section>
    </main>
  );
}
