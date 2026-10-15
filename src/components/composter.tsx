import { FormEvent, useState } from "react";
import Button from "./button";
import Icon from "./icon";

export default function Composer({
  onPost,
  user,
}: {
  onPost: (text: string) => void;
  user: string;
}) {
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    window.setTimeout(() => {
      onPost(text.trim());
      setText("");
      setPosting(false);
    }, 500);
  }

  return (
    <section className="composer-card pt-3">
      <div className="composer-top">
        <span className="avatar avatar-small teal">
          {user
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        <div>
          <h2>Share something with the community</h2>
          <p>Questions, updates, recommendations—everyone’s welcome.</p>
        </div>
      </div>
      <form onSubmit={submit}>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value.slice(0, 1024))}
          placeholder="What would you like your neighbors to know?"
          aria-label="Write a message"
        />
        <div className="composer-actions">
          <span className={text.length > 450 ? "count warning" : "count"}>
            {text.length}/500
          </span>
          <Button type="submit" disabled={!text.trim() || posting}>
            {posting ? (
              <>
                <span className="spinner" /> Posting…
              </>
            ) : (
              <>
                <Icon name="pen" /> Post message
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
