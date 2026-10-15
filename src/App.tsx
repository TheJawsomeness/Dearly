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
import {
  createPost,
  getMyVotes,
  getPosts,
  Post,
  reactOnPost,
  Vote,
} from "./backend/services/postService";
import { supabase } from "./backend/config/supabase";
import { getCount } from "./backend/services/countService";
import { logOut } from "./backend/services/authService";

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
  const [votes, setVotes] = useState<Vote[] | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Get the current session when the app loads.
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error(error.message);
        return;
      }

      setUserData(data.session?.user ?? null);
    });

    // Listen for future login/logout changes.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserData(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadCount() {
      try {
        const data = await getCount();
        setCount(data);
      } catch (error) {
        console.error("Could not load Count");
      }
    }

    loadCount();

    // 2. Subscribe to database changes
    const channel = supabase
      .channel("user_counts-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_counts",
        },
        (payload) => {
          loadCount();
        },
      )
      .subscribe((status, error) => {
        if (error) {
          console.error("REALTIME ERROR:", error);
        }
      });

    // 3. Clean up when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadVotes() {
      if (!userData) {
        setVotes([]);
        return;
      }

      try {
        const data = await getMyVotes();

        if (!cancelled) {
          setVotes(data);
        }
      } catch (error) {
        console.error("Could not get votes:", error);
      }
    }

    loadVotes();

    return () => {
      cancelled = true;
    };
  }, [userData]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    }

    // 1. Fetch posts when the app loads
    loadPosts();

    // 2. Subscribe to database changes
    const channel = supabase
      .channel("posts-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          loadPosts();
        },
      )
      .subscribe((status, error) => {
        if (error) {
          console.error("REALTIME ERROR:", error);
        }
      });

    // 3. Clean up when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  function navigate(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function authenticate(authenticatedUser: User) {
    setUserData(authenticatedUser);
    setView("board");
    setAlertMessage("Welcome! You’re now logged in.");
  }

  function handlelogout() {
    setUserData(null);
    setView("board");
    // setMessages((current) =>
    //   current.map((message) => ({ ...message, reaction: null })),
    // );
    logOut();
    setAlertMessage("You’ve been logged out.");
  }

  async function post(text: string) {
    try {
      await createPost(text);

      const updatedPosts = await getPosts();
      setPosts(updatedPosts);

      setAlertMessage("Your message has been posted!");
    } catch (error) {
      console.error("Failed to create post:", error);
      setAlertMessage("Could not create your post.");
    }
  }

  async function react(id: number, nextReaction: Exclude<Reaction, null>) {
    try {
      const stillReacting = await reactOnPost(id, nextReaction);

      // Refresh the votes from Supabase
      const updatedVotes = await getMyVotes();
      setVotes(updatedVotes);

      if (!stillReacting) {
        setAlertMessage("Your vote has been removed.");
      } else {
        setAlertMessage(
          nextReaction === "like"
            ? "You liked this message."
            : "You disliked this message.",
        );
      }
    } catch (error) {
      console.error("Failed to update vote:", error);
      setAlertMessage("Could not update your vote. Please try again.");
    }
  }

  return (
    <div className="app">
      <div className="fixed-top-position">
        <Header
          user={userName}
          view={view}
          navigate={navigate}
          logout={handlelogout}
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
          votes={votes}
          count={count}
        />
      ) : (
        <AuthPage
          mode={view}
          navigate={navigate}
          authenticate={authenticate}
          count={count}
        />
      )}
    </div>
  );
}
