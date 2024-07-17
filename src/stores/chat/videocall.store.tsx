import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { socket } from "../ws/websocket";
import { createRef } from "react";
import Peer, { SignalData } from "simple-peer";

interface VideoCallState {
  myVideo: React.RefObject<HTMLVideoElement> | null;
  userVideo: React.RefObject<HTMLVideoElement> | null;
  stream: MediaStream | null;
  caller: string;
  callingUser: boolean;
  callUser: (id: string, senderId: string) => void;
  callerName: string;
  callAccepted: boolean;
  connectionRef: React.RefObject<Peer.Instance> | null;
  callerSignal: SignalData | null;
  loading: boolean;
  receiveCall: boolean;
  handleSetMyVideo: () => void;
  callEnded: boolean;
  modalVideoCall: boolean;
  setModalVideoCall: (state: boolean) => void;
  handleSetSocketEvents: () => void;
  answerCall: (id: string) => void;
  leaveCall: () => void;
  handleSetOffVideoCall: () => void;
}

export const chatStore: StateCreator<
  VideoCallState,
  [["zustand/immer", never]]
> = (set, get) => ({
  myVideo: createRef<HTMLVideoElement>(),
  userVideo: createRef<HTMLVideoElement>(),
  stream: null,
  loading: false,
  callingUser: false,
  receiveCall: false,
  caller: "",
  callerSignal: null,
  callerName: "",
  modalVideoCall: false,
  callEnded: false,
  connectionRef: createRef<Peer.Instance>(),
  callAccepted: false,
  handleSetSocketEvents: () => {
    console.log('handling socket events')
    socket.on("call-user", (data) => {
      console.log("alguien te esta llamando: ", data);
      set({ receiveCall: true });
      set({ caller: data.senderId });
      set({ callerSignal: data.signalData });
      set({ callerName: data.senderName });
    });
  },

  setModalVideoCall: (open) => {
    set({ modalVideoCall: open });
  },
  handleSetMyVideo: async () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        set({ stream: stream });
        const myVideo = get().myVideo;
        if (myVideo?.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  },
  getMyVideo: () => {
    return;
  },
  callUser: (id: string, senderId: string) => {
    const stream = get().stream;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream!,
    });
  
    peer.on("signal", (data) => {
      socket.emit("call-user", {
        receiverId: id,
        senderId: senderId,
        signalData: data,
      });
  
      set({ callingUser: true });
    });
  
    peer.on("stream", (remoteStream) => {
      const userVideo = get().userVideo;
      if (userVideo?.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });
  
    socket.on("accept-call", (signal) => {
      set({ callAccepted: true });
      peer.signal(signal);
    });
  
    const connectionRef = get().connectionRef;
    if (connectionRef) {
      (connectionRef as React.MutableRefObject<Peer.Instance>).current = peer;
    }
  },
  
  answerCall: (id: string) => {
    set({ callAccepted: true });
    const stream = get().stream;
  
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream!,
    });
  
    peer.on("signal", (data) => {
      socket.emit("accept-call", { signalData: data, receiverId: id });
    });
  
    peer.on("stream", (remoteStream) => {
      const userVideo = get().userVideo;
      if (userVideo?.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });
  
    set({ receiveCall: false });
    set({ modalVideoCall: true });
  
    peer.signal(get().callerSignal!);
  
    const connectionRef = get().connectionRef;
    if (connectionRef) {
      (connectionRef as React.MutableRefObject<Peer.Instance>).current = peer;
    }
  },
  

  leaveCall: () => {
    set({ callEnded: true });
    const connectionRef = get().connectionRef;
    if (connectionRef && connectionRef.current) {
      connectionRef.current.destroy();
    }

    // const stream = get().stream;
    // if (stream) {
    //   stream.getTracks().forEach((track) => track.stop());
    //   set({ stream: null });
    // }
  },
  handleSetOffVideoCall: () => {
    set({ callingUser: false });
    set({ receiveCall: false });
    set({ callAccepted: false });
    set({ caller: "" });
    set({ callerSignal: null });
    set({ callerName: "" });
    set({ callEnded: false });
    set({ modalVideoCall: false });
    // const stream = get().stream;
    // if (stream) {
    //   stream.getTracks().forEach((track) => track.stop());
    //   set({ stream: null });
    // }
  },
});

export const useVideoCallState = create<VideoCallState>()(
  devtools(immer(chatStore))
);
