import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

export const sendMessage = (
  token: string | undefined,
  userId: string,
  enabled: boolean,
  propertyId?: string,
) => {
  return useClientApi({
    method: "post",
    key: ["send-msg", userId],
    endpoint: `/chat/send/${userId}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    enabled,
    axiosOptions: {
      data: propertyId ? { propertyId } : {}, 
    },
    onSuccess: (data: any) => {
      if (data?.success) toast.success(data?.message || "Message sent");
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
