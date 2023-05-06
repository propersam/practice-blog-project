import { authService } from "@/services/index";
import { User } from "@/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    setLoading(false);
  }, []);

  const refetchUser = async () => {
    setLoading(true);
    const currentUser = Cookies.get("currentUser");

    const userInfo = await authService.getUser();

    if (userInfo && currentUser) {
      const newUser = {
        ...JSON.parse(currentUser),
        ...userInfo,
      };

      Cookies.set("currentUser", JSON.stringify(newUser));
      setUser(newUser);
      setLoading(false);
    }
  };

  return { loading, user, refetchUser };
};
