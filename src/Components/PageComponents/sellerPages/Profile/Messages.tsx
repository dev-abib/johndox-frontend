"use client";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { VscFileMedia } from "react-icons/vsc";
import React, { useRef, useState } from "react";
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
  const [conversations, setConversations] = useState(conversationsData);
  const [activeMessage, setActiveMessage] = useState<any>(null);

  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const imagePreview = image ? URL.createObjectURL(image) : null;

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
        <div className="flex-1 flex flex-col bg-[#F9FAFB] py-6 px-4 lg:py-10 lg:px-8 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#404040] lg:text-2xl text-xl font-medium">
              {activeMessage.title}
            </h2>
            <button
              className="flex gap-1 items-center bg-[#0085FF] px-4 py-2 rounded-lg text-white text-sm lg:text-base"
              onClick={() => setActiveMessage(null)}
            >
              Back
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
            {activeMessage.messages.map((msg: any) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "agent" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "user" && (
                  <div className="h-10 w-10 rounded-full flex justify-center items-center bg-[#E6F3FF] text-sm font-bold">
                    {msg.sender
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                )}

                <div className="max-w-[70%]">
                  <div className="bg-white rounded-xl p-4 lg:p-6">
                    <h4 className="text-[#5F5F5F] text-sm lg:text-base mb-1">
                      {msg.sender}
                    </h4>
                    {msg.message && (
                      <p className="text-[#616161] text-sm lg:text-base">
                        {msg.message}
                      </p>
                    )}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="sent"
                        className="rounded-lg mt-2 w-[20px] h-[20px]"
                      />
                    )}
                  </div>
                  <p className="text-[#8AC7FF] text-xs lg:text-sm mt-1">
                    {msg.time}
                  </p>
                </div>

                {msg.role === "agent" && (
                  <Image
                    src={Profile}
                    alt="profile"
                    className="rounded-full w-[30px] h-[30px]"
                  />
                )}
              </div>
            ))}
          </div>

          {imagePreview && (
            <div className="mb-3 flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#E7E7E7]">
                <Image
                  src={imagePreview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="relative bg-white border border-[#E7E7E7] rounded-xl px-4 py-3 flex justify-between items-center mt-2">
            <div className="flex gap-3 items-center flex-1">
              <BsEmojiSmile
                className="cursor-pointer text-lg lg:text-xl"
                onClick={() => setShowEmoji(p => !p)}
              />
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                type="text"
                placeholder="Type your message"
                className="outline-none flex-1 text-sm lg:text-base"
              />
            </div>

            <div className="flex items-center gap-3">
              <VscFileMedia
                className="cursor-pointer text-lg lg:text-xl"
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
                className="cursor-pointer text-blue-500 text-xl lg:text-2xl"
                onClick={handleSend}
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
    </div>
  );
};

export default Messages;
