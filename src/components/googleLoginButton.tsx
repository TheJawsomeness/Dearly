import { supabase } from "../backend/config/supabase";
import Button from "./button";
/// <reference types="vite/client" />

export default function GoogleLoginButton() {
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      },
    });

    if (error) {
      console.error("Google sign-in failed:", error.message);
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      className="submit-button"
      disabled={false}
      onClick={signInWithGoogle}
    >
      <span className="google-g" aria-hidden="true">
        G
      </span>
      Sign in with Google
    </Button>
  );
}
