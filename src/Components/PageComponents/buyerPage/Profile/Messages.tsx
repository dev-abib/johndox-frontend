"use client";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { VscFileMedia } from "react-icons/vsc";
import React, { useEffect, useRef, useState } from "react";
import { IoSend, IoArrowBack, IoStar, IoStarOutline } from "react-icons/io5";
import {
  sendMessage,
  useGetConversations,
  useGetSingleUserMessage,
} from "@/Hooks/api/message.api";
import { getItem } from "@/lib/localStorage";
import useAuth from "@/Hooks/useAuth";

const Messages = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [token] = useState<string | undefined>(getItem("token"));
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Pagination state
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: convData } = useGetConversations(token);
  const conversations = convData?.data?.conversations || [];

  const {
    data: msgData,
    refetch,
    isFetching,
  } = useGetSingleUserMessage(token, activeUserId ?? undefined, nextCursor);

  const { mutate, isPending } = sendMessage(
    token,
    activeUserId ?? undefined,
    !!token,
  );

  useEffect(() => {
    if (activeUserId) {
      setNextCursor(null);
      setHasMore(true);
      setActiveConversation(null);
      setLoadingMore(false);
    }
  }, [activeUserId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!msgData?.data) return;

    setActiveConversation((prev: any) => {
      const incomingMessages = msgData.data.messages || [];
      const incomingNextCursor = msgData.data.nextCursor;
      const incomingHasMore = !!msgData.data.hasMore;

      setNextCursor(incomingNextCursor);
      setHasMore(incomingHasMore);

      if (!prev) {
        return msgData.data;
      }
      const existingIds = new Set(prev.messages.map((m: any) => m._id));
      const uniqueNew = incomingMessages.filter(
        (m: any) => !existingIds.has(m._id),
      );

      if (uniqueNew.length === 0) {
        setHasMore(false);
        return prev;
      }

      return {
        ...prev,
        chatUser: msgData.data.chatUser || prev.chatUser,
        messages: [...uniqueNew, ...prev.messages],
      };
    });

    setLoadingMore(false);
  }, [msgData]);

  useEffect(() => {
    if (activeConversation?.messages?.length && !loadingMore && !isFetching) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages?.length, loadingMore, isFetching]);

  const loadMoreMessages = () => {
    if (!hasMore || loadingMore || !nextCursor || isFetching) return;
    setLoadingMore(true);
    refetch();
  };

  const handleSend = () => {
    if ((!text.trim() && !image) || !activeUserId || !token) return;

    const tempId = Date.now();
    const formData = new FormData();
    if (text.trim()) formData.append("message", text.trim());
    if (image) formData.append("file", image);

    setActiveConversation(prev => ({
      ...prev,
      messages: [
        ...(prev?.messages || []),
        {
          _id: tempId,
          message: text || "",
          fileUrl: image ? URL.createObjectURL(image) : "",
          senderId: { _id: user._id },
          createdAt: new Date().toISOString(),
          status: "pending",
        },
      ],
    }));

    setImage(null);
    setImagePreview(null);
    setText("");

    mutate(formData, {
      onSuccess: serverMessage => {
        setActiveConversation(prev => ({
          ...prev,
          messages: prev?.messages.map(msg =>
            msg._id === tempId
              ? {
                  ...msg,
                  ...serverMessage.data,
                  senderId: msg.senderId,
                  status: "sent",
                }
              : msg,
          ),
        }));
        setText("");
        setImage(null);
        setShowEmoji(false);
      },
      onError: () => {
        setActiveConversation((prev: any) => ({
          ...prev,
          messages: prev.messages.filter((m: any) => m._id !== tempId),
        }));
      },
    });
  };

  const handleApplyRating = () => {
    // Here you would normally call an API to save the rating
    console.log("Rating submitted:", {
      toUserId: activeConversation?.chatUser?.id,
      rating,
      reviewText,
      fromUser: user?.name || user?._id,
    });

    // Optional: show success message / toast
    alert("Thank you for your rating!");

    // Reset form
    setIsRatingModalOpen(false);
    setRating(0);
    setReviewText("");
  };

  return (
    <>
      <div className="flex relative flex-col lg:flex-row gap-6  h-full">
        {!activeConversation && (
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
                const preview =
                  last?.isSentByMe === false
                    ? `You: ${last?.preview || ""}`
                    : `${other?.name || "User"}: ${last?.preview || ""}`;

                return (
                  <div
                    key={other?.id}
                    onClick={() => {
                      setActiveUserId(other?.id ?? null);
                      setActiveConversation(conv);
                    }}
                    className="cursor-pointer rounded-xl border border-[#E6F3FF] bg-[rgba(230,243,255,0.3)] p-4 hover:bg-[#E6F3FF] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <Image
                          src={other?.profilePicture || "/default_avatar.jpg"}
                          width={50}
                          height={50}
                          className="rounded-full w-[50px] h-[50px] object-cover"
                          alt={other?.name || "user"}
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
                            "Conversation"}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {preview}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="bg-[#0085FF] text-white text-xs px-2.5 py-1 rounded-full shrink-0">
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

        {/* Active Chat */}
        {activeConversation && (
          <div className="flex-1 max-h-[80vh] flex flex-col bg-[#f9fafb] rounded-2xl lg:p-8 p-4 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversation(null)}
                  className="lg:hidden text-2xl text-[#0085FF]"
                >
                  <IoArrowBack />
                </button>
                <div className="relative shrink-0">
                  <Image
                    src={
                      activeConversation.chatUser?.profilePicture ||
                      "/default_avatar.jpg"
                    }
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                    alt="chat user"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      activeConversation.chatUser?.isOnline
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <h2 className="font-medium text-[#404040] text-lg lg:text-xl">
                    {activeConversation.chatUser?.name || "User"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeConversation.chatUser?.isOnline
                      ? "Active now"
                      : "Offline"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRatingModalOpen(true)}
                className="flex items-center gap-2 bg-[#0085FF] text-white px-5 py-2.5 rounded-xl hover:bg-[#006edc] transition text-sm md:text-base font-medium"
              >
                <span>Give Rating</span>
              </button>
            </div>

            <hr className="border-gray-200 mb-5" />

            <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-6">
              {hasMore && (
                <div className="text-center py-6 sticky top-0 bg-[#F9FAFB] z-10">
                  <button
                    onClick={loadMoreMessages}
                    disabled={loadingMore || isFetching}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-xl text-sm font-medium disabled:opacity-50 transition"
                  >
                    {loadingMore || isFetching
                      ? "Loading..."
                      : "Load older messages"}
                  </button>
                </div>
              )}

              {activeConversation?.messages?.map((msg: any) => {
                const isMe = msg?.senderId?._id === user._id;
                return (
                  <div
                    key={msg._id}
                    className={`flex gap-3 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <Image
                        src={
                          activeConversation.chatUser?.profilePicture ||
                          "/default_avatar.jpg"
                        }
                        width={40}
                        height={40}
                        className="rounded-full w-[40px] h-[40px] object-cover"
                        alt="chat user"
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
                        {isMe && msg.status === "pending" && (
                          <span className="text-gray-400">Sent</span>
                        )}
                        {isMe && msg.status === "delivered" && (
                          <span className="text-gray-400">Delivered</span>
                        )}
                        {isMe && msg.status === "seen" && (
                          <span className="text-gray-400">Seen</span>
                        )}
                      </div>
                    </div>

                    {isMe && (
                      <Image
                        src={user?.profilePicture || "/default_avatar.jpg"}
                        alt="you"
                        width={40}
                        height={40}
                        className="rounded-full w-[40px] h-[40px] object-cover shrink-0 border-2 border-white mt-1"
                      />
                    )}
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
            {imagePreview && (
              <div className="mb-4 flex items-center gap-4">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-gray-300">
                  <Image
                    src={imagePreview}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                    }}
                    className="absolute cursor-pointer top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-3">
              <BsEmojiSmile
                className="text-[#0085FF] text-2xl cursor-pointer"
                onClick={() => setShowEmoji(p => !p)}
              />

              <input
                value={text}
                onChange={e => setText(e.target.value)}
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
          </div>
        )}
        {showEmoji && (
          <div ref={emojiRef} className="absolute bottom-20 left-4 z-50">
            <EmojiPicker
              onEmojiClick={emojiData => setText(p => p + emojiData.emoji)}
            />
          </div>
        )}
      </div>
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

            {/* Stars */}
            <div className="flex justify-center gap-3 md:gap-4 mb-8">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-4xl md:text-5xl transition-transform hover:scale-110 focus:outline-none"
                >
                  {rating >= star ? (
                    <IoStar className="text-yellow-400 drop-shadow" />
                  ) : (
                    <IoStarOutline className="text-gray-300" />
                  )}
                </button>
              ))}
            </div>

            {/* Review textarea */}
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Write your review (optional)..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0085FF] resize-none min-h-[100px]"
              rows={4}
            />

            {/* Buttons */}
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
                className="px-6 py-2.5 rounded-xl bg-[#0085FF] text-white font-medium hover:bg-[#006edc] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
