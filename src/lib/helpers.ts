import { useErrorHandler } from "@/hooks/useErrorHandler";

export const NotificationTypes = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARN: "warn",
};

export const handleAxiosError = (err: any, showToast: boolean = true) => {
  if (err?.response) {
    // The client was given an error response (5xx, 4xx)
    console.log(err?.response?.data);
    console.log(err?.response?.data?.status);
    console.log(err?.response?.headers);
  } else if (err?.request) {
    // The client never received a response, and the request was never left
    console.log(err?.request);
  } else {
    // Anything else
    console.log("Error: ", err?.data?.message);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useErrorHandler(err, showToast);
};

export const LangList = [
  { value: "mk", text: "MK" },
  { value: "en", text: "EN" },
];
