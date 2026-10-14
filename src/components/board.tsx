import { useMemo, useState } from "react";
import { Message, Reaction, View } from "./const/types";
import { Post } from "../backend/services/postService";
import Composer from "./composter";
import GuestPrompt from "./guestPrompt";
import MessageSkeleton from "./MessageSkeleton";
import MessageCard from "./messageCard";
import Icon from "./icon";
import Button from "./button";

export default function Board({
  user,
  posts,
  navigate,
  onPost,
  onReact,
  loading,
}: {
  user: string | null;
  posts: Post[] | null;
  navigate: (view: View) => void;
  onPost: (text: string) => void;
  onReact: (id: number, reaction: Exclude<Reaction, null>) => void;
  loading: boolean;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      (posts ?? []).filter((post) =>
        `${post.content} ${post.author ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [posts, search],
  );

  return (
    <main className="board-main">
      <section className="board-hero">
        <div>
          <div className="eyebrow">
            <span className="live-dot" /> The neighborhood is talking
          </div>
          <h1>Community message board</h1>
          <p>Updates, questions, and good things worth sharing.</p>
        </div>
        <div className="board-stat" aria-label="Community activity">
          <span className="stat-avatars">
            <span className="avatar coral">MC</span>
            <span className="avatar sky">OB</span>
            <span className="avatar violet">PS</span>
          </span>
          <span>
            <strong>42 neighbors</strong>
            active today
          </span>
        </div>
      </section>

      {user ? (
        <Composer user={user} onPost={onPost} />
      ) : (
        <GuestPrompt navigate={navigate} />
      )}

      <section className="feed" aria-labelledby="feed-title">
        <div className="feed-toolbar">
          <div>
            <h2 id="feed-title">Latest messages</h2>
            <p>{posts ? posts.length : 0} conversations from your community</p>
          </div>
          <label className="search">
            <Icon name="search" />
            <span className="sr-only">Search messages</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search messages"
            />
          </label>
        </div>

        <div className="message-list" aria-live="polite" aria-busy={loading}>
          {loading ? (
            <>
              <MessageSkeleton />
              <MessageSkeleton />
              <MessageSkeleton />
            </>
          ) : filtered.length ? (
            filtered.map((post) => (
              <MessageCard
                key={post.id}
                post={post}
                loggedIn={Boolean(user)}
                onReact={onReact}
              />
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-icon">
                <Icon name="search" />
              </span>
              <h3>No messages found</h3>
              <p>
                Try a different search, or clear it to see every conversation.
              </p>
              <Button variant="secondary" onClick={() => setSearch("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
