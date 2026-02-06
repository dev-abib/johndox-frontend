"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getItem } from "@/lib/localStorage";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";

let socketInstance: Socket | null = null;

interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
  activeChatId: null,
  setActiveChatId: () => {},
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const router = useRouter();
  const [token] = useState<string | undefined>(getItem("token"));
  const queryKey = ["conversations", token];

  useEffect(() => {
    if (!token) return;

    if (socketInstance?.connected) {
      socketRef.current = socketInstance;
      setIsConnected(true);
      return;
    }

    const socket = io(SOCKET_URL, {
      query: { token },
      transports: ["websocket"],
    });

    socketInstance = socket;
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
      setIsConnected(false);
    });

    return () => {
      socket.off();
    };
  }, [token]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !isConnected || !user) return;

    const handleReceiveMessage = (msg: any) => {
      const senderId = String(msg.senderId?._id ?? msg.senderId ?? "");
      const isMyMessage = senderId === String(user._id);

      if (isMyMessage) return; // Own messages handled in handleSend

      // Update conversation cache
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old?.data?.conversations) return old;

        const isCurrentFocused =
          activeChatId === senderId && document.hasFocus();

        const updated = old.data.conversations.map((conv: any) => {
          const convOtherId = String(
            conv.otherUser?.id ?? conv.otherUser?._id ?? "",
          );
          if (convOtherId !== senderId) return conv;

          return {
            ...conv,
            unreadCount: isCurrentFocused
              ? conv.unreadCount
              : (conv.unreadCount || 0) + 1,
            lastMessage: {
              preview: msg.message || (msg.fileType ? `[${msg.fileType}]` : ""),
              sentAt: new Date(msg.createdAt),
              isSentByMe: false,
            },
            lastMessageAt: new Date(msg.createdAt),
          };
        });

        const sorted = updated.sort((a: any, b: any) => {
          const ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
          const tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
          return tb - ta;
        });

        return {
          ...old,
          data: {
            ...old.data,
            conversations: sorted,
            totalUnreadCount: sorted.reduce(
              (sum: number, c: any) => sum + (c.unreadCount || 0),
              0,
            ),
          },
        };
      });

      // Auto-mark as seen if current focused chat
      if (activeChatId === senderId && document.hasFocus()) {
        socket.emit("message-seen", { messageId: msg._id });
      }

      if (!(activeChatId === senderId && document.hasFocus())) {
        // Play audio
        const audio = new Audio("/notification.mp3");
        audio.volume = 0.5;
        audio.play().catch(err => console.error("[Audio] Failed:", err));

        const title = `New message from ${msg.senderName || "User"}`;
        const body =
          msg.message?.slice(0, 80) ||
          (msg.fileType ? `Sent a ${msg.fileType}` : "Sent a message");
        const icon = msg.sender?.profilePicture || "/default_avatar.jpg";

        const sendNotification = () => {
          if (navigator.serviceWorker?.controller) {
            console.log("[SW] Posting notification");
            navigator.serviceWorker.controller.postMessage({
              type: "SHOW_NOTIFICATION",
              payload: {
                title,
                body,
                icon,
                tag: `chat-msg-${msg._id || Date.now()}`,
                senderId,
                url: msg.sender?.url,
              },
            });
          } else {
            console.log("[Notification] Direct fallback");
            const notif = new Notification(title, { body, icon });
            notif.onclick = () => {
              window.focus();
              router.push(`/messages?chat=${senderId}`);
            };
          }
        };

        if ("Notification" in window) {
          if (Notification.permission === "granted") {
            sendNotification();
          } else if (Notification.permission === "default") {
            Notification.requestPermission().then(permission => {
              if (permission === "granted") sendNotification();
              else console.warn("[Notifications] Permission denied by user");
            });
          } else {
            console.warn("[Notifications] Permission denied");
          }
        } else {
          console.warn("[Notifications] Not supported in this browser");
        }
      }
    };

    const handleConversationUpdated = (payload: any) => {
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old?.data?.conversations) return old;

        const updated = old.data.conversations.map((conv: any) => {
          if (String(conv.conversationId) !== String(payload.conversationId))
            return conv;

          const isSentByMe =
            String(payload.lastMessage.senderId) === String(user?._id);

          return {
            ...conv,
            unreadCount: payload.unreadCount ?? conv.unreadCount,
            lastMessage: {
              preview: payload.lastMessage.text || "",
              sentAt: new Date(payload.lastMessage.timestamp),
              isSentByMe,
            },
            lastMessageAt: new Date(payload.lastMessage.timestamp),
            lastMessageType: payload.lastMessageType,
          };
        });

        const sorted = updated.sort((a: any, b: any) => {
          const ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
          const tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
          return tb - ta;
        });

        return {
          ...old,
          data: {
            ...old.data,
            conversations: sorted,
            totalUnreadCount: sorted.reduce(
              (sum: number, c: any) => sum + (c.unreadCount || 0),
              0,
            ),
          },
        };
      });
    };

    const handlePresenceUpdate = (data: {
      userId: string;
      isOnline: boolean;
      lastSeen: number | null;
    }) => {
      // Update all conversations with this user's presence
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old?.data?.conversations) return old;

        const updatedConvs = old.data.conversations.map((conv: any) => {
          const convUserId = String(
            conv.otherUser?.id ?? conv.otherUser?._id ?? "",
          );
          const presenceUserId = String(data.userId ?? "");

          if (convUserId === presenceUserId) {
            return {
              ...conv,
              otherUser: {
                ...conv.otherUser,
                isOnline: data.isOnline,
                lastSeen: data.lastSeen,
              },
            };
          }
          return conv;
        });

        return {
          ...old,
          data: { ...old.data, conversations: updatedConvs },
        };
      });
    };

    socket.on("receive-message", handleReceiveMessage);
    socket.on("conversation-updated", handleConversationUpdated);
    socket.on("presence-update", handlePresenceUpdate);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("conversation-updated", handleConversationUpdated);
      socket.off("presence-update", handlePresenceUpdate);
    };
  }, [isConnected, user, activeChatId, queryClient, queryKey, router]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        activeChatId,
        setActiveChatId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
