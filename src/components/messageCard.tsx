import { Post, Vote } from "../backend/services/postService";
import { getProfileNameByUUID } from "../backend/services/profileServices";
import { Message, Reaction } from "./const/types";
import Icon from "./icon";
import { useEffect, useState } from "react";

const tone = "teal";

export default function MessageCard({
  post,
  onReact,
  loggedIn,
  vote,
}: {
  post: Post;
  onReact: (id: number, reaction: Exclude<Reaction, null>) => void;
  loggedIn: boolean;
  vote: Vote | null;
}) {
  const hasLiked = vote?.vote_type === "like";
  const hasDisliked = vote?.vote_type === "dislike";

  return (
    <article className="message-card">
      <div className="message-head">
        <span className="avatar">{post.author.charAt(0).toUpperCase()}</span>

        <div>
          <h3>{post.author}</h3>
          <time>{new Date(post.created_at).toLocaleString()}</time>
        </div>
      </div>

      <p className="message-text">{post.content}</p>

      <div className="reaction-row">
        <button
          className={`reaction like ${hasLiked ? "selected" : ""}`}
          onClick={() => onReact(post.id, "like")}
          disabled={!loggedIn}
          aria-label={`${post.likes} likes${!loggedIn ? ", log in to react" : ""}`}
        >
          <Icon name="thumbUp" />
          <span>{post.likes}</span>
        </button>
        <button
          className={`reaction dislike ${hasDisliked ? "selected" : ""}`}
          onClick={() => onReact(post.id, "dislike")}
          disabled={!loggedIn}
          aria-label={`${post.dislikes} dislikes${!loggedIn ? ", log in to react" : ""}`}
        >
          <Icon name="thumbDown" />
          <span>{post.dislikes}</span>
        </button>
        {!loggedIn && <span className="reaction-hint">Log in to react</span>}
      </div>
    </article>
  );
}
