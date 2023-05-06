import AuthService from "./auth/auth.service";
import CityService from "./resources/city.service";
import PostService from "./resources/post.service";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authService = new AuthService(baseUrl + "/auth");
export const postService = new PostService(baseUrl + "/posts");
export const cityService = new CityService(baseUrl + "/cities");
