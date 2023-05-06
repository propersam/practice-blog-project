import { handleAxiosError } from "@/lib/helpers";

import BaseService from "../base.service";

export default class NewsService extends BaseService {
  constructor(url: string) {
    super(url);
    this.instance.defaults.withCredentials = false;

    this.instance.interceptors.request.clear();
    this.instance.interceptors.request.use(
      (request) => {
        delete request.headers.authorization;
        return request;
      },
      (error) => {
        console.log("Request Error encountered: ", error);
        handleAxiosError(error);
        throw new Error("Bad Request Error / Network / Internet Connection Error <<<No Response>>>");
      }
    );
  }
}
