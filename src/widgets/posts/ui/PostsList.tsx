import { QueryClient, useQuery } from "@tanstack/react-query";
import { Post } from "@/entities/post";
import { Spinner } from "@/shared/components/Spinner";
import { postsOptions } from "../api/postsApi";
import { IPost } from "@/entities/post/model/IPost";

export function PostsList() {
  const { data: posts, isPending, error } = useQuery(postsOptions());
  return (
    <>
      {isPending ? (
        <Spinner />
      ) : error ? (
        <span>Error</span>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post: IPost) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

PostsList.loader = async (queryClient: QueryClient) => {
  await queryClient.ensureQueryData(postsOptions());
};
