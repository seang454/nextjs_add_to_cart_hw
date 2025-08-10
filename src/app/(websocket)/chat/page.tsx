"use client";

import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Match your server port here:
    socketRef.current = io("http://localhost:3000");
    // Ensure the server URL matches your server setup
    socketRef.current.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    // Match event name exactly as in server.js
    socketRef.current.on("chat message", (msg: string) => {
      setChat((prev) => [...prev, msg]);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      socketRef.current.emit("chat message", message); // match server event
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-0 flex flex-col border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-purple-500 rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            💬 Next.js Socket.IO Chat
          </h1>
          <span className="text-xs text-white/80">TS Demo</span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 h-72 bg-gray-50">
          {chat.length === 0 && (
            <div className="text-gray-400 text-center mt-10">
              No messages yet. Start the conversation!
            </div>
          )}
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              } mb-2`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg shadow text-base max-w-[80%] break-words ${
                  idx % 2 === 0
                    ? "bg-blue-100 text-blue-900 rounded-bl-none"
                    : "bg-purple-100 text-purple-900 rounded-br-none"
                }`}
              >
                {msg}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2 border-t border-gray-200 p-4 bg-white rounded-b-2xl">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
