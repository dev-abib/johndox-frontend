"use client";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { VscFileMedia } from "react-icons/vsc";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IoSend, IoArrowBack, IoStar, IoStarOutline } from "react-icons/io5";
import {
  sendMessage,
  useGetConversations,
  useGetSingleUserMessage,
} from "@/Hooks/api/message.api";
import { getItem } from "@/lib/localStorage";
import useAuth from "@/Hooks/useAuth";
import { io, Socket } from "socket.io-client";
import { formatDistanceToNow } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Use ref to hold the socket instance → prevents race conditions in cleanup
const socketRef = { current: null as Socket | null };

const connectSocket = (token: string | undefined) => {
  if (!token) return;
  if (socketRef.current?.connected) return;

  const newSocket = io(SOCKET_URL, {
    query: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    transports: ["websocket"],
    autoConnect: false,
  });

  newSocket.connect();

  newSocket.on("connect", () =>
    console.log("[SOCKET] Connected – ID:", newSocket.id),
  );
  newSocket.on("connect_error", err =>
    console.error("[SOCKET] Connect error:", err.message),
  );
  newSocket.on("disconnect", reason =>
    console.log("[SOCKET] Disconnected –", reason),
  );

  socketRef.current = newSocket;
};

const Messages = () => {
const queryClient = useQueryClient();
const { user } = useAuth();

const [token] = useState<string | undefined>(getItem("token"));
const [text, setText] = useState("");
const [image, setImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(null);
const [activeUserId, setActiveUserId] = useState<string | null>(null);
const [showEmoji, setShowEmoji] = useState(false);
const [messages, setMessages] = useState<any[]>([]);
const [nextCursor, setNextCursor] = useState<{
  createdAt: string;
  _id: string;
} | null>(null);
const [hasMore, setHasMore] = useState(true);
const [loadingMore, setLoadingMore] = useState(false);
const [rating, setRating] = useState(0);
const [reviewText, setReviewText] = useState("");
const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
const [isOtherTyping, setIsOtherTyping] = useState(false);
const [partnerOnline, setPartnerOnline] = useState<boolean>(false);
const [partnerLastSeen, setPartnerLastSeen] = useState<number | null>(null);
const [fetchCursor, setFetchCursor] = useState<string | undefined>(undefined);
const [isPrepending, setIsPrepending] = useState(false);

const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
const fileRef = useRef<HTMLInputElement>(null);
const messagesContainerRef = useRef<HTMLDivElement>(null);
const emojiPickerRef = useRef<HTMLDivElement>(null);
const lastRequestedCursor = useRef<string | null>(null);
const prevScrollHeightRef = useRef<number | null>(null);
const prevScrollTopRef = useRef<number | null>(null);
const justSentMessageRef = useRef<boolean>(false);

const queryKey = ["conversations", token];
const { data: convData, refetch: refetchConversations } =
  useGetConversations(token);
const conversations = convData?.data?.conversations || [];

const {
  data: msgData,
  isFetching,
  isLoading,
  refetch,
} = useGetSingleUserMessage(token, activeUserId ?? undefined);

const { mutate, isPending } = sendMessage(
  token,
  activeUserId ?? undefined,
  !!token,
);

const chatUser = msgData?.data?.chatUser;
const currentConv = conversations.find(
  (c: any) => c.otherUser?.id === activeUserId,
);
const conversationId = currentConv?.conversationId;

// Socket connection + cleanup
useEffect(() => {
  if (!token) {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    return;
  }

  connectSocket(token);

  return () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };
}, [token]);

// Notification permission
useEffect(() => {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}, []);

// Service Worker registration (background notifications)
useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch(err => console.error("Service Worker registration failed:", err));
  }
}, []);

// Mark conversation seen when opening chat
useEffect(() => {
  const socket = socketRef.current;
  if (!socket?.connected || !activeUserId || !conversationId) return;

  socket.emit("conversation-seen", { conversationId });

  messages
    .filter(
      m =>
        String(m.senderId?._id ?? m.senderId) !== String(user?._id) &&
        m.status !== "seen",
    )
    .forEach(m => socket.emit("message-seen", { messageId: m._id }));
}, [activeUserId, conversationId, messages.length, user?._id]);

// Reset state on chat switch
useEffect(() => {
  setPartnerOnline(false);
  setPartnerLastSeen(null);
  setIsOtherTyping(false);
  setMessages([]);
  setNextCursor(null);
  setHasMore(true);
  setLoadingMore(false);
  lastRequestedCursor.current = null;
  setText("");
  setImage(null);
  setImagePreview(null);
  setFetchCursor(undefined);
}, [activeUserId]);

// Real-time conversation list update
const updateConversationInCache = useCallback(
  (payload: any) => {
    queryClient.setQueryData(queryKey, (old: any) => {
      if (!old?.data?.conversations) return old;

      const updated = old.data.conversations
        .map((conv: any) => {
          if (conv.conversationId !== payload.conversationId) return conv;
          return {
            ...conv,
            unreadCount: payload.unreadCount ?? conv.unreadCount ?? 0,
            lastMessage: payload.lastMessage
              ? {
                  ...conv.lastMessage,
                  preview:
                    payload.lastMessage.text || conv.lastMessage?.preview || "",
                  sentAt: new Date(payload.lastMessage.timestamp),
                  isSentByMe:
                    payload.lastMessage.senderId === String(user?._id),
                }
              : conv.lastMessage,
            lastMessageAt: payload.lastMessage?.timestamp
              ? new Date(payload.lastMessage.timestamp)
              : conv.lastMessageAt,
          };
        })
        .sort((a: any, b: any) => {
          const ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
          const tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
          return tb - ta;
        });

      return {
        ...old,
        data: {
          ...old.data,
          conversations: updated,
          totalUnreadCount: updated.reduce(
            (sum: number, c: any) => sum + (c.unreadCount || 0),
            0,
          ),
        },
      };
    });
  },
  [queryClient, queryKey, user?._id],
);

useEffect(() => {
  const socket = socketRef.current;
  if (!socket) return;

  socket.on("conversation-updated", updateConversationInCache);

  return () => {
    socket.off("conversation-updated", updateConversationInCache);
  };
}, [updateConversationInCache]);

// ─── Main socket listeners ─────────────────────────────────────────
useEffect(() => {
  const socket = socketRef.current;
  if (!socket) return;

  const handleReceiveMessage = (msg: any) => {
    const senderId = String(msg.senderId?._id ?? msg.senderId ?? "");
    const isMyMessage = senderId === String(user?._id);
    const isFromCurrentChat = senderId === activeUserId;

    setMessages(prev => {
      const incomingId = String(msg._id);
      const tempIndex = prev.findIndex(
        m =>
          m._id.startsWith("temp-") &&
          (m.message || "").trim() === (msg.message || "").trim() &&
          String(m.senderId?._id ?? m.senderId) === String(user?._id),
      );

      if (tempIndex !== -1) {
        const newList = [...prev];
        newList[tempIndex] = {
          ...msg,
          senderId: { _id: senderId },
          status: msg.status || "sent",
        };
        return newList;
      }

      if (prev.some(m => String(m._id) === incomingId)) return prev;

      return [
        ...prev,
        {
          ...msg,
          senderId: { _id: senderId },
          status: msg.status || "sent",
        },
      ];
    });

    if (!isMyMessage) {
      console.log(msg);
      
      // Sound
      const audio = new Audio("/notification.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});

      // Foreground notification
      if (document.hasFocus() && Notification.permission === "granted") {
        const title = `New message from ${msg.senderName || "User"}`;
        const body =
          msg.message?.slice(0, 80) ||
          (msg.fileType ? `Sent a ${msg.fileType}` : "Sent a message");
        const notif = new Notification(title, {
          body,
          icon: msg.sender?.profilePicture || "/default_avatar.jpg",
          tag: `msg-${msg._id}`,
        });
        notif.onclick = () => {
          window.focus();
          setActiveUserId(senderId);
        };
      }

      // Background notification via service worker
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SHOW_NOTIFICATION",
          payload: {
            title: `New message from ${msg.senderName || "User"}`,
            body:
              msg.message?.slice(0, 120) ||
              (msg.fileType ? `Sent a ${msg.fileType}` : "New message"),
            icon: msg.sender?.profilePicture || "/default_avatar.jpg",
            tag: `chat-msg-${msg._id || Date.now()}`,
          },
        });
      }

      // Auto mark seen if current chat is focused
      if (isFromCurrentChat && document.hasFocus() && socket.connected) {
        socket.emit("message-seen", { messageId: msg._id });
      }
    }
  };

  const handleTyping = ({ senderId }: { senderId: string }) => {
    if (senderId === activeUserId) {
      setIsOtherTyping(true);
      clearTimeout(typingTimeoutRef.current!);
      typingTimeoutRef.current = setTimeout(
        () => setIsOtherTyping(false),
        4000,
      );
    }
  };

  const handleStopTyping = ({ senderId }: { senderId: string }) => {
    if (senderId === activeUserId) setIsOtherTyping(false);
  };

  const handleDelivered = ({ messageId }: { messageId: string }) => {
    setMessages(prev =>
      prev.map(m =>
        String(m._id) === messageId ? { ...m, status: "delivered" } : m,
      ),
    );
  };

  const handleSeen = ({ messageId }: { messageId: string }) => {
    setMessages(prev =>
      prev.map(m =>
        String(m._id) === messageId ? { ...m, status: "seen" } : m,
      ),
    );
  };

  const handleUserOnline = ({ userId }: { userId: string }) => {
    if (userId === activeUserId) setPartnerOnline(true);
  };

  const handleUserOffline = ({
    userId,
    lastSeen,
  }: {
    userId: string;
    lastSeen: number;
  }) => {
    if (userId === activeUserId) {
      setPartnerOnline(false);
      setPartnerLastSeen(lastSeen);
    }
  };

  const handlePresenceUpdate = (data: {
    userId: string;
    isOnline: boolean;
    lastSeen: number | null;
  }) => {
    if (data.userId === activeUserId) {
      setPartnerOnline(data.isOnline);
      setPartnerLastSeen(data.lastSeen);
    }
  };

  // Register listeners
  socket.on("receive-message", handleReceiveMessage);
  socket.on("conversation-updated", updateConversationInCache);
  socket.on("typing", handleTyping);
  socket.on("stop-typing", handleStopTyping);
  socket.on("message-delivered", handleDelivered);
  socket.on("message-seen", handleSeen);
  socket.on("user-online", handleUserOnline);
  socket.on("user-offline", handleUserOffline);
  socket.on("presence-update", handlePresenceUpdate);

  // Safe cleanup
  return () => {
    if (socket) {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("conversation-updated", updateConversationInCache);
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
      socket.off("message-delivered", handleDelivered);
      socket.off("message-seen", handleSeen);
      socket.off("user-online", handleUserOnline);
      socket.off("user-offline", handleUserOffline);
      socket.off("presence-update", handlePresenceUpdate);
    }
  };
}, [
  activeUserId,
  user?._id,
  updateConversationInCache,
  // Add other stable dependencies here if needed
]);

// Presence polling
useEffect(() => {
  const socket = socketRef.current;
  if (!socket || !activeUserId) return;

  socket.emit("get-presence", { targetUserId: activeUserId });

  const interval = setInterval(() => {
    if (socket.connected && activeUserId) {
      socket.emit("get-presence", { targetUserId: activeUserId });
    }
  }, 30000);

  return () => clearInterval(interval);
}, [activeUserId]);

// ─── Rest of your component remains unchanged ──────────────────────
// Load messages, load more, typing, send, JSX, etc.

useEffect(() => {
  if (activeUserId) refetch();
}, [activeUserId, refetch]);

useEffect(() => {
  if (!msgData?.data || isLoading || !activeUserId) return;
  if (lastRequestedCursor.current === fetchCursor) return;
  lastRequestedCursor.current = fetchCursor || "initial";

  const incoming = msgData.data.messages || [];
  setMessages(prev => {
    const ids = new Set(prev.map(m => String(m._id)));
    const uniqueNew = incoming.filter((m: any) => !ids.has(String(m._id)));
    return isPrepending ? [...uniqueNew, ...prev] : [...prev, ...uniqueNew];
  });
  setHasMore(!!msgData.data.hasMore);
  setNextCursor(msgData.data.nextCursor ?? null);
  setIsPrepending(false);
}, [msgData, activeUserId, isLoading, fetchCursor, isPrepending]);

const loadMoreMessages = useCallback(() => {
  if (!hasMore || loadingMore || isFetching || isLoading || !nextCursor) return;
  const cursorStr = JSON.stringify({
    createdAt: nextCursor.createdAt,
    _id: nextCursor._id,
  });
  if (lastRequestedCursor.current === cursorStr) return;

  if (messagesContainerRef.current) {
    prevScrollHeightRef.current = messagesContainerRef.current.scrollHeight;
    prevScrollTopRef.current = messagesContainerRef.current.scrollTop;
  }

  setIsPrepending(true);
  setLoadingMore(true);
  setFetchCursor(cursorStr);
  refetch();
}, [hasMore, loadingMore, isFetching, isLoading, nextCursor, refetch]);

useLayoutEffect(() => {
  if (
    !isPrepending ||
    !prevScrollHeightRef.current ||
    !messagesContainerRef.current
  )
    return;

  const container = messagesContainerRef.current;
  const delta = container.scrollHeight - prevScrollHeightRef.current;
  container.scrollTop = (prevScrollTopRef.current ?? 0) + delta;

  prevScrollHeightRef.current = null;
  prevScrollTopRef.current = null;
  setLoadingMore(false);
}, [isPrepending]);

const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
  messagesContainerRef.current?.scrollTo({
    top: messagesContainerRef.current.scrollHeight,
    behavior,
  });
}, []);

useEffect(() => {
  if (!messagesContainerRef.current) return;
  const container = messagesContainerRef.current;
  const nearBottom =
    Math.abs(
      container.scrollHeight - container.scrollTop - container.clientHeight,
    ) < 120;

  if (justSentMessageRef.current || nearBottom || messages.length <= 3) {
    scrollToBottom(justSentMessageRef.current ? "smooth" : "instant");
    justSentMessageRef.current = false;
  }
}, [messages, scrollToBottom]);

const handleTyping = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    const socket = socketRef.current;
    if (!activeUserId || !socket?.connected) return;

    socket.emit("typing", { receiverId: activeUserId });
    clearTimeout(typingTimeoutRef.current!);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { receiverId: activeUserId });
    }, 1800);
  },
  [activeUserId],
);

const handleSend = () => {
  if ((!text.trim() && !image) || !activeUserId || !token) return;

  const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const formData = new FormData();
  if (text.trim()) formData.append("message", text.trim());
  if (image) formData.append("file", image);

  justSentMessageRef.current = true;

  setMessages(prev => [
    ...prev,
    {
      _id: tempId,
      message: text.trim() || "",
      fileUrl: image ? URL.createObjectURL(image) : undefined,
      senderId: { _id: user?._id },
      createdAt: new Date().toISOString(),
      status: "sending",
    },
  ]);

  setText("");
  setImage(null);
  setImagePreview(null);

  mutate(formData, {
    onError: () => {
      setMessages(prev =>
        prev.map(m => (m._id === tempId ? { ...m, status: "failed" } : m)),
      );
    },
  });
};

const handleApplyRating = () => {
  console.log("Rating submitted:", rating, reviewText);
  setIsRatingModalOpen(false);
  setRating(0);
  setReviewText("");
  };
  
  return (
    <>
      <div className="flex relative flex-col lg:flex-row gap-6 h-full">
        {!activeUserId && (
          <div className="flex-1 bg-[#F9FAFB] py-6 px-4 lg:py-10 lg:px-6 rounded-2xl overflow-y-auto">
            <h2 className="text-[#404040] text-xl lg:text-2xl font-medium">
              Messages
            </h2>
            <p className="text-[#5F5F5F] mt-2 text-sm lg:text-base">
              Stay connected with interested buyers in real time
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {conversations.map((conv: any) => {
                const last = conv?.lastMessage;
                const other = conv?.otherUser;
                const preview = last?.isSentByMe
                  ? `You: ${last?.preview || ""}`
                  : `${other?.name || "User"}: ${last?.preview || ""}`;

                return (
                  <div
                    key={other?.id}
                    onClick={() => setActiveUserId(other?.id ?? null)}
                    className="cursor-pointer rounded-xl border border-[#E6F3FF] bg-[rgba(230,243,255,0.3)] p-4 hover:bg-[#E6F3FF] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <Image
                          src={other?.profilePicture || "/default_avatar.jpg"}
                          width={50}
                          height={50}
                          className="rounded-full w-12 h-12 object-cover"
                          alt=""
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                            other?.isOnline ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#404040] truncate">
                          {conv?.property?.propertyName ||
                            other?.name ||
                            "Chat"}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {preview}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="bg-[#0085FF] text-white text-xs px-2.5 py-1 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeUserId && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] rounded-2xl lg:p-8 p-4 h-full max-h-[80vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveUserId(null)}
                  className="lg:hidden text-2xl text-[#0085FF]"
                >
                  <IoArrowBack />
                </button>
                <div className="relative shrink-0">
                  <Image
                    src={chatUser?.profilePicture || "/default_avatar.jpg"}
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                    alt="partner"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      partnerOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <h2 className="font-medium text-[#404040] text-lg lg:text-xl">
                    {chatUser?.name || "Chat"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {partnerOnline
                      ? "Active now"
                      : partnerLastSeen
                        ? `Last seen ${formatDistanceToNow(new Date(partnerLastSeen), { addSuffix: true })}`
                        : "Offline"}
                  </p>
                  <div className="min-h-[1.4rem] mt-0.5">
                    {isOtherTyping && (
                      <p className="text-sm text-blue-500 italic">typing...</p>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsRatingModalOpen(true)}
                className="flex items-center gap-2 bg-[#0085FF] text-white px-5 py-2.5 rounded-xl hover:bg-[#006edc] text-sm md:text-base font-medium"
              >
                Give Rating
              </button>
            </div>

            <hr className="border-gray-200 mb-5" />

            {/* Messages list */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto flex flex-col gap-4 pb-6 scroll-smooth"
            >
              {hasMore && (
                <div className="text-center py-6 sticky top-0 bg-[#F9FAFB] z-10">
                  <button
                    onClick={loadMoreMessages}
                    disabled={loadingMore || isFetching || isLoading}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-xl text-sm font-medium disabled:opacity-50 transition"
                  >
                    {loadingMore || isFetching || isLoading
                      ? "Loading..."
                      : "Load older messages"}
                  </button>
                </div>
              )}

              {messages.map(msg => {
                const isMe =
                  String(msg.senderId?._id ?? msg.senderId) ===
                  String(user?._id);
                return (
                  <div
                    key={msg._id}
                    className={`flex gap-3 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <Image
                        src={chatUser?.profilePicture || "/default_avatar.jpg"}
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10 object-cover"
                        alt=""
                      />
                    )}
                    <div className="max-w-[70%] md:max-w-[75%] flex flex-col gap-1">
                      <div
                        className={`px-4 py-3 rounded-2xl shadow-sm ${
                          isMe
                            ? "bg-[#0085FF] text-white"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        {msg.message && (
                          <p className="break-words">{msg.message}</p>
                        )}
                        {msg.fileUrl && (
                          <Image
                            src={msg.fileUrl}
                            alt="attachment"
                            width={320}
                            height={320}
                            className="rounded-lg mt-2 max-h-64 object-contain"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 px-1">
                        {new Date(msg.createdAt).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        {isMe && (
                          <span
                            className={`${
                              msg.status === "failed"
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {msg.status === "sending"
                              ? "Sending..."
                              : msg.status === "failed"
                                ? "Failed"
                                : msg.status || "Sent"}
                          </span>
                        )}
                      </div>
                    </div>
                    {isMe && (
                      <Image
                        src={user?.profilePicture || "/default_avatar.jpg"}
                        alt="you"
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10 object-cover shrink-0 border-2 border-white mt-1"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input area */}
            <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-3">
              <BsEmojiSmile
                className="text-[#0085FF] text-2xl cursor-pointer"
                onClick={() => setShowEmoji(p => !p)}
              />
              <input
                value={text}
                onChange={handleTyping}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 outline-none text-base min-h-[44px]"
              />
              <VscFileMedia
                className="text-[#0085FF] text-2xl cursor-pointer"
                onClick={() => fileRef.current?.click()}
              />
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
              <IoSend
                onClick={handleSend}
                className={`text-2xl cursor-pointer transition ${
                  (text.trim() || image) && !isPending
                    ? "text-[#0085FF] hover:scale-110"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Image preview */}
            {imagePreview && (
              <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative w-full sm:w-56 h-56 rounded-xl overflow-hidden border-2 border-gray-300 shadow-md flex-shrink-0 bg-black/5">
                    <Image
                      src={imagePreview}
                      alt="preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 w-full sm:w-auto">
                    <p className="font-medium text-gray-800 truncate max-w-full">
                      {image?.name || "Selected image"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1.5">
                      {(image?.size / 1024 / 1024).toFixed(2)} MB • Ready to
                      send
                    </p>
                    <div className="flex flex-wrap gap-4 mt-5">
                      <button
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        className="px-5 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="px-5 py-2.5 bg-blue-50 text-[#0085FF] rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {showEmoji && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-24 left-4 z-50 sm:left-8"
          >
            <EmojiPicker
              onEmojiClick={emojiObject => setText(p => p + emojiObject.emoji)}
              width={320}
              height={400}
            />
          </div>
        )}
      </div>

      {/* Rating modal */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
            <button
              onClick={() => setIsRatingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Rate your experience
            </h3>
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-5xl transition-transform hover:scale-110 active:scale-95"
                >
                  {rating >= star ? (
                    <IoStar className="text-yellow-400 drop-shadow" />
                  ) : (
                    <IoStarOutline className="text-gray-300" />
                  )}
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Write your review (optional)..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0085FF] resize-none min-h-[110px]"
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsRatingModalOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyRating}
                disabled={rating === 0}
                className="px-6 py-2.5 rounded-xl bg-[#0085FF] text-white font-medium hover:bg-[#006edc] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
