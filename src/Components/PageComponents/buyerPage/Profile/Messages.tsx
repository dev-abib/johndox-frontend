"use client";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { VscFileMedia } from "react-icons/vsc";
import React, { useEffect, useRef, useState } from "react";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Profile from "../../../../Assets/profilepic.png";
import { useGetConversations } from "@/Hooks/api/message.api";
import { getItem } from "@/lib/localStorage";

const Messages = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [reviewText, setReviewText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const imagePreview = image ? URL.createObjectURL(image) : null;
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    setToken(getItem("token"));
  }, []);

  const { data: msgData } = useGetConversations(token);
  const conversations = msgData?.data?.conversations || [];

  // Handle sending a new message
  const handleSend = () => {
    if (!text && !image) return;

    const newMsg = {
      id: Date.now(),
      sender: "You",
      role: "agent",
      message: text,
      image: imagePreview,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setActiveConversation((prev: any) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
      lastMessage: { ...newMsg, direction: "sent" },
    }));

    setText("");
    setImage(null);
    setShowEmoji(false);
  };

  const handleApplyRating = () => {
    console.log("Rating submitted:", {
      rating,
      reviewText,
      buyer: activeConversation?.otherUser?.name,
    });
    setIsRatingModalOpen(false);
    setRating(0);
    setReviewText("");
    alert("Thank you for your rating!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {!activeConversation && (
        <div className="flex-1 bg-[#F9FAFB] py-6 px-4 lg:py-10 lg:px-6 rounded-2xl">
          <h2 className="text-[#404040] lg:text-2xl text-xl font-medium">
            Messages
          </h2>
          <h5 className="text-[#5F5F5F] mt-2 text-sm lg:text-base">
            Stay connected with interested buyers in real time
          </h5>

          <div className="mt-6 flex flex-col gap-4">
            {conversations.map(conv => {
              const lastMsg = conv?.lastMessage;
              const otherUser = conv?.otherUser;
              const previewText =
                lastMsg?.isSentByMe === false
                  ? `You: ${lastMsg?.preview}`
                  : `${otherUser.name} : ${lastMsg?.preview}`;

              return (
                <div
                  key={conv.conversationId}
                  onClick={() => setActiveConversation(conv)}
                  className="rounded-xl border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] p-4 flex flex-col sm:flex-row sm:justify-between gap-3 cursor-pointer w-full relative hover:bg-[#E6F3FF] transition"
                >
                  <div className="flex-1  w-full  relative  mb-3">
                    <div className=" w-full flex flex-row items-center justify-between ">
                      <div className="flex gap-x-3 flex-row items-center ">
                        <div className="relative">
                          <Image
                            src={otherUser?.profilePicture}
                            width={50}
                            height={50}
                            className="h-[50px] rounded-full w-[50px] object-cover"
                            alt={otherUser?.name}
                          />
                          <span className="flex absolute items-center top-0 right-0 mt-[4px] mr-[-1px] gap-1">
                            {otherUser?.isOnline ? (
                              <span className="ml-2 w-3 h-3 bg-green-400 rounded-full"></span>
                            ) : (
                              <span className="ml-2 w-3 h-3 bg-red-400 rounded-full"></span>
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-[#404040] font-medium text-lg lg:text-xl">
                            {conv.title || otherUser?.name || "Conversation"}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-1 text-[#404040] font-medium text-sm lg:text-base">
                        {lastMsg?.sentAt && (
                          <span>
                            {new Date(lastMsg.sentAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[#404040] mt-2 text-sm lg:text-base">
                      {previewText}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <button className="bg-[#0085FF] px-3 py-1.5 rounded-lg text-white text-sm sm:self-start">
                      {conv.unreadCount}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Conversation */}
      {activeConversation && (
        <div className="flex-1 flex flex-col bg-[#F9FAFB] py-6 md:px-4 px-2  lg:py-10 lg:px-8 rounded-2xl">
          <div className="md:flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveConversation(null)}
                className="lg:hidden text-[#0085FF] text-2xl"
              >
                <IoArrowBack />
              </button>
              <h2 className="text-[#404040] lg:text-2xl md:text-lg text-base font-medium">
                {activeConversation.title || activeConversation.otherUser?.name}
              </h2>
            </div>

            <div className="flex md:justify-start justify-end md:mt-0 mt-5">
              <button
                onClick={() => setIsRatingModalOpen(true)}
                className="flex gap-2 items-center bg-[#0085FF] px-5 py-3 rounded-xl text-white font-medium hover:bg-[#006edc] transition"
              >
                Give Rating
              </button>
            </div>
          </div>

          {/* Messages */}
          {/* <div className="overflow-y-auto h-[600px] flex flex-col gap-6 pb-4">
            {activeConversation?.messages?.map((msg: any) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "agent" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "user" && (
                  <div className="h-10 w-10 rounded-full flex justify-center items-center bg-[#E6F3FF] text-[#0085FF] text-sm font-bold">
                    {msg.sender
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                )}

                <div className="max-w-[75%]">
                  <div className="bg-white rounded-3xl px-5 py-4 shadow-sm border border-gray-100">
                    <h4 className="text-[#5F5F5F] text-sm font-medium mb-1">
                      {msg.role === "agent" ? "You" : msg.sender}
                    </h4>
                    {msg.message && (
                      <p className="text-[#101010] text-base leading-relaxed">
                        {msg.message}
                      </p>
                    )}
                    {msg.image && (
                      <Image
                        src={msg.image}
                        alt="sent"
                        className="rounded-lg w-[40px] h-[40px] mt-3 max-w-full shrink-0"
                      />
                    )}
                  </div>
                  <p className="text-[#94A3B8] text-xs mt-2 text-right">
                    {msg.time}
                  </p>
                </div>

                {msg.role === "agent" && (
                  <Image
                    src={Profile}
                    alt="You"
                    width={40}
                    height={40}
                    className="rounded-full w-[40px] h-[40px] object-cover border-2 border-white shadow shrink-0"
                  />
                )}
              </div>
            ))}
          </div> */}

          {/* Image Preview */}
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
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="relative bg-white border border-[#E7E7E7] rounded-2xl lg:px-5 px-2 lg:py-4 py-3 flex items-center lg:gap-4 gap-2 mt-4">
            <BsEmojiSmile
              className="cursor-pointer text-[#0085FF] md:text-xl text-lg"
              onClick={() => setShowEmoji(p => !p)}
            />

            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), handleSend())
              }
              type="text"
              placeholder="Type your message"
              className="flex-1 outline-none text-base"
            />

            <div className="flex items-center lg:gap-4 gap-2">
              <VscFileMedia
                className="cursor-pointer text-[#0085FF] lg:text-xl text-base"
                onClick={() => fileRef.current?.click()}
              />
              <input
                ref={fileRef}
                type="file"
                hidden
                accept="image/*"
                onChange={e => setImage(e.target.files?.[0] || null)}
              />
              <IoSend
                onClick={handleSend}
                className="cursor-pointer text-[#0085FF] lg:text-2xl text-lg hover:scale-110 transition"
              />
            </div>

            {showEmoji && (
              <div className="absolute bottom-20 left-4 z-50">
                <EmojiPicker onEmojiClick={e => setText(p => p + e.emoji)} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setIsRatingModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-medium text-[#101010] text-center mb-8">
              Rating
            </h3>

            <div className="flex justify-center gap-4 mb-10">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-5xl transition transform hover:scale-110"
                >
                  {rating >= star ? (
                    <IoStar className="text-yellow-400" />
                  ) : (
                    <IoStarOutline className="text-gray-300" />
                  )}
                </button>
              ))}
            </div>

            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0085FF] resize-none"
              rows={4}
            />

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsRatingModalOpen(false)}
                className="px-8 py-3 rounded-xl border border-[#0085FF] text-[#0085FF] font-medium hover:bg-[#0085FF]/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyRating}
                disabled={rating === 0}
                className="px-8 py-3 rounded-xl bg-[#0085FF] text-white font-medium hover:bg-[#006edc] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
