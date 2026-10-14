import {
  FormEvent,
  ReactNode,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Message, Reaction, View } from "./components/const/types";
import { starterMessages } from "./components/starternessages";
import Header from "./components/header";
import Board from "./components/board";
import AuthPage from "./components/authPage";
import Icon from "./components/icon";
import AlertMessage from "./components/alertMessage";
import { User } from "@supabase/supabase-js";
import { getProfileNameByUUID } from "./backend/services/profileServices";
import { getPosts, Post } from "./backend/services/postService";

const icons: Record<string, ReactNode> = {
  arrow: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
      <path d="m13.7 7.5 3 3" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  ),
  thumbDown: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v11M3 4v9a1 1 0 0 0 1 1h3l4 7h2a2 2 0 0 0 2-2l-1-5h4a2 2 0 0 0 2-2l-1-6a2 2 0 0 0-2-2H7" />
    </svg>
  ),
  thumbUp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 21V10M3 20v-9a1 1 0 0 1 1-1h3l4-7h2a2 2 0 0 1 2 2l-1 5h4a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 2H7" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2M16 4a3 3 0 0 1 0 6M17 13a5 5 0 0 1 4 5v2" />
    </svg>
  ),
};

export default function App() {
  const [view, setView] = useState<View>("board");
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!userData) {
      setUserName(null);
      return;
    }

    let cancelled = false;

    async function loadName() {
      try {
        const name = await getProfileNameByUUID(userData!.id);

        if (!cancelled) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Failed to load profile name:", error);

        if (!cancelled) {
          setUserName(null);
        }
      }
    }

    loadName();

    return () => {
      cancelled = true;
    };
  }, [userData]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Couldnt load Posts:");
        setAlertMessage("Couldnt load posts ${error}");
      }
    }

    loadPosts();
  }, []);

  function navigate(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function authenticate(authenticatedUser: User) {
    setUserData(authenticatedUser);
    setView("board");
    setAlertMessage("Welcome! You’re now logged in.");
  }

  function logout() {
    setUserData(null);
    setView("board");
    // setMessages((current) =>
    //   current.map((message) => ({ ...message, reaction: null })),
    // );
    setAlertMessage("You’ve been logged out.");
  }

  function post(text: string) {
    // const displayName = userName || "Neighbor";
    // setMessages((current) => [
    //   {
    //     id: Date.now(),
    //     author: displayName,
    //     initials: displayName
    //       .split(" ")
    //       .map((part) => part[0])
    //       .join("")
    //       .slice(0, 2),
    //     text,
    //     time: "Just now",
    //     likes: 0,
    //     dislikes: 0,
    //     reaction: null,
    //     tone: "teal",
    //   },
    //   ...current,
    // ]);
    // setAlertMessage("Your message is live!");
  }

  function react(id: number, nextReaction: Exclude<Reaction, null>) {
    // if (!userName) return;
    // let selected = false;
    // setMessages((current) =>
    //   current.map((message) => {
    //     if (message.id !== id) return message;
    //     const previous = message.reaction;
    //     selected = previous !== nextReaction;
    //     return {
    //       ...message,
    //       likes:
    //         message.likes +
    //         (previous === "like" ? -1 : 0) +
    //         (nextReaction === "like" && previous !== "like" ? 1 : 0),
    //       dislikes:
    //         message.dislikes +
    //         (previous === "dislike" ? -1 : 0) +
    //         (nextReaction === "dislike" && previous !== "dislike" ? 1 : 0),
    //       reaction: previous === nextReaction ? null : nextReaction,
    //     };
    //   }),
    // );
    // setAlertMessage(
    //   nextReaction === "like"
    //     ? "You liked this message."
    //     : "You disliked this message.",
    // );
  }

  return (
    <div className="app">
      <div className="fixed-top-position">
        <Header
          user={userName}
          view={view}
          navigate={navigate}
          logout={logout}
        />
        <AlertMessage
          message={alertMessage}
          onClose={() => setAlertMessage("")}
        />
      </div>

      {view === "board" ? (
        <Board
          user={userName}
          posts={posts}
          navigate={navigate}
          onPost={post}
          onReact={react}
          loading={loading}
        />
      ) : (
        <AuthPage mode={view} navigate={navigate} authenticate={authenticate} />
      )}
    </div>
  );
}
