import socketio, { Socket, Manager } from "socket.io-client";
import { SOCKET_URL } from '../../env.d'
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "../auth/auth.store";

interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | null>(null);
export let socket: Socket;

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {

export const getWsConnection = (token: string) => {
  if (token) {
    console.log(SOCKET_URL)
    const manager = new Manager(
        SOCKET_URL || "http://localhost:4000/socket.io/socket.io.js",
      {
        extraHeaders: {
          authentication: token!,
        },
      }
    );
    socket?.removeAllListeners();
    socket = manager.socket("/");
  }
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
