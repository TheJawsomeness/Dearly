import { ReactNode } from "react";
import Button from "./button";
import { View } from "./const/types";
import Logo from "./logo";

export default function Header({
  user,
  view,
  navigate,
  logout,
}: {
  user: string | null;
  view: View;
  navigate: (view: View) => void;
  logout: () => void;
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo onClick={() => navigate("board")} />
        <nav aria-label="Main navigation">
          <button
            className={`nav-link ${view === "board" ? "active" : ""}`}
            onClick={() => navigate("board")}
          >
            Message board
          </button>
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              <div className="user-chip">
                <span className="avatar avatar-small">MC</span>
                <span className="user-name">{user}</span>
              </div>
              <Button variant="secondary" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <button className="text-button" onClick={() => navigate("login")}>
                Log in
              </button>
              <Button onClick={() => navigate("register")}>
                Join the community
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
