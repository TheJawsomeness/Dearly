import { Reaction } from "../../components/const/types";
import { supabase } from "../config/supabase";
import { getProfileNameByUUID } from "./profileServices";

export type Post = {
  id: number;
  content: string;
  created_at: string;
  creator_id: string | null;
  likes: number;
  dislikes: number;
  author: string;
};

export type Vote = {
    post_id: number
    vote_type: "like"|"dislike"
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const postsWithAuthors = await Promise.all(
    data.map(async (post) => {
      const author = post.creator_id
        ? await getProfileNameByUUID(post.creator_id)
        : null;

      return {
        ...post,
        author: author ?? "Anonymous",
      };
    }),
  );

  return postsWithAuthors;
}

export async function reactOnPost(postID:number, reaction :Exclude<Reaction, null>):Promise<boolean> {
    console.log("REACTION",reaction)
    const {data, error} = await supabase.rpc("toggle_vote", {
        p_post_id: postID,
        p_vote_type: reaction,
    });
    console.log("DONE")
    return data
}

export async function getMyVotes() {
  const { data, error } = await supabase
    .from("votes")
    .select("post_id, vote_type");

  if (error) throw error;

  return data as Vote[]
}

export async function createPost(content: string): Promise<Post> {
  const { data, error } = await supabase.rpc("create_post", {
    p_content: content,
  });

  if (error) throw error;

  return data;
}