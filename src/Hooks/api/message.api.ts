import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

export const sendMessage = (token: string, userId: string) => {
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

export const useGetConversations = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["messages", token],
    enabled: !!token,
    endpoint: "/chat/conversations",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};
