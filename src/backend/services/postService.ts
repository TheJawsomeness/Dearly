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