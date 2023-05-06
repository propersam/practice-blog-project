import { showToast } from "@/components/atoms/ShowToast";
import { NotificationTypes } from "@/lib/helpers";

export function useErrorHandler(error: any, showToastAlert = true) {
  const message = error?.response?.data?.message || error?.response?.message || error?.toString();

  showToastAlert && showToast(message, NotificationTypes.ERROR);
  console.warn("Trace/Debug Toast Error Log: \n", error);
}
