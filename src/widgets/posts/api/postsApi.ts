import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import PostsService from "../api/PostsService";

export const postsOptions = () => {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: PostsService.fetchPosts,
  });
};

export const useUpdatePosts = () => {
  const queryClient = useQueryClient();

  const addPostMutation = useMutation({
    mutationFn: PostsService.addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ... another mutations for posts

  return {
    addPostMutation,
  };
};
