"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getItem } from "@/lib/localStorage";

let socketInstance: Socket | null = null;

interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = getItem("token");
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
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
