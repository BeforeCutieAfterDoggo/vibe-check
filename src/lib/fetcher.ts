import axios from "axios";
import { toast } from "react-toastify";

export const handleAxiosError = (error: any, customMessage?: string) => {
  console.error(error);
  if (axios.isAxiosError(error)) {
    const message = customMessage ?? error.response?.data.error;
    toast.error(message);
  }
};
