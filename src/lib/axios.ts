import axios from "axios";
import Cookies from "js-cookie";
import router from "next/router";

// Create axios instance.
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    // automatically set token in axios default header
    console.log("token gotten : ", Cookies.get("token") ?? "");
    const token = Cookies.get("token") ? JSON.parse(Cookies.get("token") ?? "") : "";

    if (token) {
      request.headers.authorization = "Bearer " + token;
    }

    // Important: request interceptors **must** return the request.
    return request;
  },
  (error) => {
    console.log("Request Error encountered: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // Any HTTP Code which is not 2xx will be considered as error
    const statusCode = err?.response?.data?.status;
    // unauthenticated or unauthorized
    if (statusCode === 401 || statusCode === 403) {
      // remove expired token and data from cookies
      Cookies.remove("token");
      Cookies.remove("currentUser");
      router.push("/login");
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
