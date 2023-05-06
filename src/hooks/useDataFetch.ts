import { postService, cityService } from "@/services/index";
import { City, Post } from "@/types";

import { useApiFetch } from "./useApi";

interface CitiesOutput {
  cities: City[] | City;
  loading: boolean;
}
export const useFetchCities = (endpoint = "", query = ""): CitiesOutput => {
  const { data: cities, error, loading } = useApiFetch(cityService, endpoint, query);
  if (error) {
    console.warn("Error fetching cities: ", error);
  }

  return { cities, loading };
};

interface PostOutput {
  posts: Post[] | Post;
  loading: boolean;
}
export const useFetchPosts = (endpoint = "", query = ""): PostOutput => {
  const { data: posts, error, loading } = useApiFetch(postService, endpoint, query);
  if (error) {
    console.warn("Error fetching Posts: ", error);
  }

  return { posts, loading };
};
