import { IPost } from "../model/IPost.js";

export function Post({ post }: { post: IPost }) {
  return (
    <div key={post.id} className="rounded-[6px] border-2 border-purple-800 px-1">
      {post.title}
    </div>
  );
}
