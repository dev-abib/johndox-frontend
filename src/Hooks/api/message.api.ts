import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

export const sendMessage = (token: string , userId:string) => {
  return useClientApi({
    method: "post",
    key: ["send-msg"],
    endpoint: `/chat/send/${userId}`,
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
