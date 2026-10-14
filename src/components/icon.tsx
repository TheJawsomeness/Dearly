import { icons } from "./const/icons";

export default function Icon({ name }: { name: keyof typeof icons }) {
  return <span className="icon">{icons[name]}</span>;
}
