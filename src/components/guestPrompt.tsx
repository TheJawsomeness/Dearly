import Button from "./button";
import { View } from "./const/types";
import Icon from "./icon";

export default function GuestPrompt({
  navigate,
}: {
  navigate: (view: View) => void;
}) {
  return (
    <section className="guest-prompt">
      <div className="guest-icon">
        <Icon name="pen" />
      </div>
      <div className="guest-copy">
        <h2>Have something to share?</h2>
        <p>Log in or create a free account to post and react to messages.</p>
      </div>
      <div className="guest-actions">
        <Button onClick={() => navigate("login")}>Log in</Button>
        <Button variant="secondary" onClick={() => navigate("register")}>
          Create account
        </Button>
      </div>
    </section>
  );
}
