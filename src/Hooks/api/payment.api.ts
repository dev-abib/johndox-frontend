import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

export const checkOutPlan = (token: string | undefined) => {

  return useClientApi({
    method: "post",
    key: ["checkout"],
    endpoint: `/checkout`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message || "Checkout started");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Payment initiation failed");
    },
  });
};
