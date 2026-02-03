import toast from "react-hot-toast";
import useClientApi from "../useClientApi";
import { useQueryClient } from "@tanstack/react-query";


export const sendMessage = (
  token: string | undefined,
  userId: string,
  enabled: boolean,
) => {
  const queryClient = useQueryClient();

  return useClientApi({
    method: "post",
    key: ["send-msg", userId],
    endpoint: `/chat/send/${userId}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "multipart/form-data",
    },
    enabled,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message || "Message sent");

        queryClient.invalidateQueries({
          queryKey: ["single-user-message", userId],
        });

        queryClient.invalidateQueries({
          queryKey: ["conversations"],
        });
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to send message");
    },
  });
};




export const useGetConversations = (token?: string) => {
  return useClientApi({
    method: "get",
    key: ["conversations"],
    enabled: !!token,
    endpoint: "/chat/conversations",
    isPrivate: true,
  });
};

export const useGetSingleUserMessage = (token?: string, userId?: string) => {
  return useClientApi({
    method: "get",
    key: ["single-user-message", userId],
    enabled: !!token && !!userId,
    endpoint: `/chat/messages/${userId}`,
    isPrivate: true,
  });
};
