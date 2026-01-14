// All Dashboard API

import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

// Add Listing
export const useAddListing = () => {
  const token = localStorage.getItem("token");

  return useClientApi({
    method: "post",
    key: ["addlisting"],
    endpoint: "/add-new-property",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message || "Listing created successfully!");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create listing");
    },
  });
};
