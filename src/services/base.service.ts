import { handleAxiosError } from "@/lib/helpers";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

export default class BaseService {
  protected readonly instance: AxiosInstance;
  public url;
  public constructor(url: string) {
    this.url = url;
    this.instance = axios.create({
      baseURL: url,
      withCredentials: true,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });

    this.instance.interceptors.request.use(
      (request) => {
        // automatically set token in axios default header
        const token = Cookies.get("token") ? JSON.parse(Cookies.get("token") ?? "") : "";

        if (token) {
          request.headers.authorization = "Bearer " + token;
        }

        // Important: request interceptors **must** return the request.
        return request;
      },
      (error) => {
        console.log("Request Error encountered: ", error);
        handleAxiosError(error);
        throw new Error("Bad Request Error: Network / Internet Connection Error <<<No Response>>>");
      }
    );

    this.instance.interceptors.response.use(
      (res) => res,
      (err) => {
        // Any HTTP Code which is not 2xx will be considered as error
        const statusCode = err?.response?.status;
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
  }

  async all(): Promise<any> {
    try {
      const response = await this.instance.get<any>("");
      return response.data;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }

  async fetchData(endpoint: string, query = ""): Promise<any> {
    try {
      const response = await this.instance.get<any>(`${endpoint}${query && "?" + query}`);
      return response.data;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }

  async createData(payload: any, endpoint = ""): Promise<any> {
    try {
      const response = await this.instance.post<any>(`${endpoint}`, payload);
      return response.data;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }

  async updateData(payload: any, endpoint = ""): Promise<any> {
    try {
      const response = await this.instance.put<any>(`${endpoint}`, payload);
      return response.data;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }
}
