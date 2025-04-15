import { IPost } from "@/entities/post/model/IPost";
import { $api } from "@/shared/http/api-clients";

export default class PostsService {
  static async fetchPosts(): Promise<IPost[]> {
    const response = await $api.get<IPost[]>("/posts");
    return response.data;
  }

  static async addPost(post: Omit<IPost, "id">): Promise<IPost> {
    const response = await $api.post<IPost>("/posts", post);
    return response.data;
  }
}
