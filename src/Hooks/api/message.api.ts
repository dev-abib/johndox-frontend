import toast from "react-hot-toast";
import useClientApi from "../useClientApi";
import { useQueryClient } from "@tanstack/react-query";

export const sendMessage = (
  token: string | undefined,
  userId: string,
  enabled: boolean,
) => {

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
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to send message");
    },
  });
};

export const rateUser = (
  token: string | undefined,
  reciverId: string | undefined,
  enabled: boolean,
) => {
  return useClientApi({
    method: "post",
    key: ["rate-user"],
    endpoint: `/rate/${reciverId}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    enabled,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useGetConversations = (token?: string) => {
  return useClientApi({
    method: "get",
    key: ["conversations", token],
    enabled: !!token,
    endpoint: "/chat/conversations",
    isPrivate: true,
  });
};

export const useGetSingleUserMessage = (
  token?: string,
  userId?: string,
  cursor?: string,
) => {
  return useClientApi({
    method: "get",
    key: ["messages", "conversation", userId, cursor ?? "first-page"],
    enabled: !!token && !!userId,
    endpoint: `/chat/messages/${userId}${
      cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""
    }`,
    isPrivate: true,
  });
};
