import { showToast } from "@/components/atoms/ShowToast";
import { NotificationTypes } from "@/lib/helpers";
import { authService } from "@/services/index";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await authService.login(payload);
      showToast(response?.message, NotificationTypes.SUCCESS);
      return response;
    } catch (error) {
      // error is already handled
      showToast("Email / Password is Invalid", NotificationTypes.ERROR);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: any) => {
    try {
      setLoading(true);
      const response = await authService.register(payload);
      showToast(response?.message, NotificationTypes.SUCCESS);
      return response;
    } catch (error) {
      // error is already handled
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await authService.logout();
      showToast(response?.message, NotificationTypes.SUCCESS);
      return response;
    } catch (error) {
      // error is already handled
      return null;
    } finally {
      setLoading(false);
    }
  };

  const verifySmsCode = async (payload: { code: string }) => {
    try {
      setLoading(true);
      const response = await authService.verifySmsCode(payload);
      showToast(response?.message, NotificationTypes.SUCCESS);
      return response;
    } catch (error) {
      // error is already handled
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, register, logout, verifySmsCode };
};
