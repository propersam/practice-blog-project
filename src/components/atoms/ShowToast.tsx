import { NotificationTypes } from "@/lib/helpers";
import { ToastOptions, toast } from "react-toastify";

export const showToast = (message: string, type: string) => {
  const options: ToastOptions<{}> | undefined = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  switch (type) {
    case NotificationTypes.SUCCESS:
      toast.success(message, options);
      break;
    case NotificationTypes.ERROR:
      toast.error(message, options);
      break;
    case NotificationTypes.INFO:
      toast.info(message, options);
      break;
    case NotificationTypes.WARN:
      toast.warn(message, options);
      break;

    default:
      toast(message, options);
      break;
  }
};
