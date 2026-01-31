import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

// Request Tour
export const RequestTour = (token?: string) => {
  return useClientApi({
    method: "post",
    key: ["request-tour"],
    endpoint: "/request-a-tour",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message || "Tour request sent successfully!");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to send request");
    },
  });
};

export const AddFavourite = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return useClientApi({
    method: "post",
    key: ["add-favourite"],
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,

    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message);
      }
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to toggle favourite");
    },
  });
};

