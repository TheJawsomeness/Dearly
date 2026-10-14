export type View = "board" | "login" | "register";
export type Reaction = "like" | "dislike" | null;

export type Message = {
  id: number;
  author: string;
  initials: string;
  text: string;
  time: string;
  likes: number;
  dislikes: number;
  reaction: Reaction;
  tone: string;
};
