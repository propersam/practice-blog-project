import { handleAxiosError } from "@/lib/helpers";
import { User } from "@/types";
import Cookies from "js-cookie";

import BaseService from "../base.service";

export default class AuthService extends BaseService {
  constructor(url: string) {
    super(url);
  }

  async getUser(): Promise<any> {
    try {
      const response = await this.instance.get<{ user: User; role: any[] }>("/user");

      return response?.data.user;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }

  async login(payload: { email: string; password: string }): Promise<any> {
    const response = await this.instance.post<{
      status: string;
      message: string;
      token: string;
      sms_verified_at: string;
    }>("/login", payload);
    try {
      if (response?.data.token) {
        const token = response?.data.token;
        Cookies.set("token", JSON.stringify(token));

        // fetch user data next
        if (token) {
          const user = await this.getUser();
          Cookies.set("currentUser", JSON.stringify(user));
        }
      }
      return response?.data;
    } catch (err) {
      handleAxiosError(err, false);
      return Promise.reject(err);
    }
  }

  async logout(): Promise<void | any> {
    try {
      // const response = await this.instance.post("/logout", {});
      /** logout route expires token from backend */
      // remove token and data from cookies
      Cookies.remove("token");
      Cookies.remove("currentUser");
      // return response?.data;
      return true;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }

  async register(payload: any): Promise<any> {
    try {
      const response = await this.instance.post<{ status: boolean; message: string; token: string }>("/register", payload);

      if (response?.data.token) {
        const token = response?.data.token;
        Cookies.set("token", JSON.stringify(token));

        // fetch user data next
        if (token) {
          const user = await this.getUser();
          Cookies.set("currentUser", JSON.stringify(user));
        }
      }

      return response?.data;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }

  async verifySmsCode(payload: any): Promise<any> {
    try {
      const response = await this.instance.post<{ message: string }>("/sms/find", payload);

      if (response?.data.message) {
        // like login and others print out success message
        //
        // re-fetch user data next to update verified field
        const user = await this.getUser();
        Cookies.set("currentUser", JSON.stringify(user));
      }
      return response?.data;
    } catch (err) {
      handleAxiosError(err);
      return Promise.reject(err);
    }
  }
}
