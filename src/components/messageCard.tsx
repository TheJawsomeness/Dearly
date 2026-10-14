import { Message, Reaction } from "./const/types";
import Icon from "./icon";

export default function MessageCard({
  message,
  loggedIn,
  onReact,
}: {
  message: Message;
  loggedIn: boolean;
  onReact: (id: number, reaction: Exclude<Reaction, null>) => void;
}) {
  return (
    <article className="message-card">
      <div className="message-head">
        <span className={`avatar ${message.tone}`}>{message.initials}</span>
        <div>
          <h3>{message.author}</h3>
          <time>{message.time}</time>
        </div>
      </div>
      <p className="message-text">{message.text}</p>
      <div className="reaction-row">
        <button
          className={`reaction like ${message.reaction === "like" ? "selected" : ""}`}
          onClick={() => onReact(message.id, "like")}
          disabled={!loggedIn}
          aria-label={`${message.likes} likes${!loggedIn ? ", log in to react" : ""}`}
          aria-pressed={message.reaction === "like"}
        >
          <Icon name="thumbUp" />
          <span>{message.likes}</span>
        </button>
        <button
          className={`reaction dislike ${message.reaction === "dislike" ? "selected" : ""}`}
          onClick={() => onReact(message.id, "dislike")}
          disabled={!loggedIn}
          aria-label={`${message.dislikes} dislikes${!loggedIn ? ", log in to react" : ""}`}
          aria-pressed={message.reaction === "dislike"}
        >
          <Icon name="thumbDown" />
          <span>{message.dislikes}</span>
        </button>
        {!loggedIn && <span className="reaction-hint">Log in to react</span>}
      </div>
    </article>
  );
}
