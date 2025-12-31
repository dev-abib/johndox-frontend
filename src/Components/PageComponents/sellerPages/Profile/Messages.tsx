"use client";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { VscFileMedia } from "react-icons/vsc";
import React, { useRef, useState } from "react";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { IoStar, IoStarOutline } from "react-icons/io5"; 
import Profile from "../../../../Assets/profilepic.png";

const conversationsData = [
  {
    id: 1,
    title: "Oceanview Villa in Riviera Maya",
    user: "Maria Rodriguez",
    date: "10/26/2025",
    preview:
      "Thank you for your interest! I'd be happy to arrange a viewing...",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "Maria Rodriguez",
        role: "user",
        message:
          "Hi! I just saw your listing for the 2-acre land in Playa del Carmen. Is it still available?",
        time: "10:05 AM",
      },
      {
        id: 2,
        sender: "You",
        role: "agent",
        message: "Yes, it’s available. Would you like to schedule a viewing?",
        time: "10:10 AM",
      },
    ],
  },
  {
    id: 2,
    title: "Beachfront Land Tulum",
    user: "Carlos Mendez",
    date: "10/24/2025",
    preview: "Is financing available for this property?",
    unread: false,
    messages: [],
  },
];

const Messages = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [reviewText, setReviewText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [activeMessage, setActiveMessage] = useState<any>(null);
  const imagePreview = image ? URL.createObjectURL(image) : null;
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [conversations, setConversations] = useState(conversationsData);


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

    setConversations(prev =>
      prev.map(chat =>
        chat.id === activeMessage.id
          ? { ...chat, messages: [...chat.messages, newMsg] }
          : chat
      )
    );

    setActiveMessage((prev: any) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setText("");
    setImage(null);
    setShowEmoji(false);
  };

  const handleApplyRating = () => {
    console.log("Rating submitted:", {
      rating,
      reviewText,
      buyer: activeMessage.user,
    });
    setIsRatingModalOpen(false);
    setRating(0);
    setReviewText("");
    alert("Thank you for your rating!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {!activeMessage && (
        <div className="flex-1 bg-[#F9FAFB] py-6 px-4 lg:py-10 lg:px-6 rounded-2xl">
          <h2 className="text-[#404040] lg:text-2xl text-xl font-medium">
            Messages
          </h2>
          <h5 className="text-[#5F5F5F] mt-2 text-sm lg:text-base">
            Stay connected with interested buyers in real time
          </h5>

          <div className="mt-6 flex flex-col gap-4">
            {conversations.map(chat => (
              <div
                key={chat.id}
                onClick={() => setActiveMessage(chat)}
                className="rounded-xl border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] p-4 flex flex-col sm:flex-row sm:justify-between gap-3 cursor-pointer hover:bg-[#E6F3FF] transition"
              >
                <div className="flex-1">
                  <h3 className="text-[#404040] font-medium text-lg lg:text-xl">
                    {chat.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2 mt-1 text-[#404040] font-medium text-sm lg:text-base">
                    <span className="flex items-center gap-1">
                      <CiUser />
                      {chat.user}
                    </span>
                    <span>{chat.date}</span>
                  </div>
                  <p className="text-[#404040] mt-2 text-sm lg:text-base">
                    {chat.preview}
                  </p>
                </div>
                {chat.unread && (
                  <button className="bg-[#0085FF] px-3 py-1.5 rounded-lg text-white text-sm sm:self-start">
                    New
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMessage && (
        <div className="flex-1 flex flex-col bg-[#F9FAFB] py-6 md:px-4 px-2  lg:py-10 lg:px-8 rounded-2xl">
          <div className="md:flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveMessage(null)}
                className="lg:hidden text-[#0085FF] text-2xl"
              >
                <IoArrowBack />
              </button>
              <h2 className="text-[#404040] lg:text-2xl md:text-lg text-base font-medium">
                {activeMessage.title}
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

          <div className=" overflow-y-auto h-[600px] flex flex-col gap-6 pb-4">
            {activeMessage.messages.map((msg: any) => (
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
                      {msg.sender}
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
                    width={10}
                    height={10}
                    className="rounded-full w-[40px] h-[40px] object-cover border-2 border-white shadow shrink-0"
                  />
                )}
              </div>
            ))}
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
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            </div>
          )}

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

      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsRatingModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>

            {/* Title */}
            <h3 className="text-2xl font-medium text-[#101010] text-center mb-8">
              Rating
            </h3>

            {/* Stars */}
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

            {/* Review Textarea */}
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Robert"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0085FF] resize-none"
              rows={4}
            />

            {/* Buttons */}
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
