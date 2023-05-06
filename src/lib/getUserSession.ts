import { User } from "@/types";
import Cookies from "js-cookie";

import { handleAxiosError } from "./helpers";

const getUserSession = async () => {
  let user: User | null = null;
  let loading = false;
  let token;

  try {
    loading = true;
    token = Cookies.get("token");
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      user = JSON.parse(currentUser);
    }
  } catch (error) {
    handleAxiosError(error);
  } finally {
    loading = false;
  }

  console.log('user: ', user);
  return {
    user,
    loading,
    token,
  };
};

export default getUserSession;
