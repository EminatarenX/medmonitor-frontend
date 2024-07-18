import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { socket } from "../../stores/ws/websocket";
import Peer, { SignalData } from "simple-peer";
import {
  AssignmentRounded,
  CallEndRounded,
  PhoneRounded,
} from "@mui/icons-material";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAuthState } from "../../stores/auth/auth.store";
import { Button, IconButton, TextField } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDoctorState } from "../../stores/auth/admin/doctor.store";
const VideoCallPage = () => {
  const params = useParams<{ id: string }>();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState<SignalData | string>("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();
  const doctor = useAuthState(state => state.doctor)
  const patient = useAuthState(state => state.patient)
  const from = params.id !  == patient?.id ? `${patient?.name} ${patient?.lastName}`: `${doctor?.name} ${doctor?.lastName}`
  

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      }).catch(error => {
        console.log(error)
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: from,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current!.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current! = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current!.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current!.destroy();
  };

  useEffect(() => {
    if (params.id) {
      setIdToCall(params.id);
    }
  }, []);

  return (
    <div className="bg-neutral-900 min-h-screen text-neutral-100 p-4 relative">
      {receivingCall && !callAccepted && (
        <div className="fixed top-0 left-0 right-0 bg-sky-500 text-white py-4 px-6 flex justify-between items-center z-50">
          <span className="text-lg font-semibold">{name} is calling...</span>
          <Button
            variant="contained"
            className="bg-white text-sky-500 hover:bg-neutral-100"
            onClick={answerCall}
          >
            Answer
          </Button>
        </div>
      )}
      <h1 className="text-3xl font-bold text-center mb-8">Zoomish</h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1  gap-4 mb-8">
          <div className="bg-neutral-800 rounded-lg overflow-hidden">
          {callAccepted && !callEnded && (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="bg-neutral-800 rounded-lg overflow-hidden ">
          {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="w-full h-full object-cover"
              />
            )}
          
          </div>
        </div>
        <div className="bg-neutral-800 rounded-lg p-6 mb-8">
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            fullWidth
            label="ID to call"
            variant="outlined"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            className="mb-4"
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <div className="flex justify-center">
            {callAccepted && !callEnded ? (
              <Button
                variant="contained"
                className="bg-red-500 hover:bg-red-600"
                onClick={leaveCall}
                startIcon={<CallEndRounded />}
              >
                End Call
              </Button>
            ) : (
              <IconButton
                className="bg-sky-500 hover:bg-sky-600 p-4"
                onClick={() => callUser(idToCall)}
              >
                <PhoneRounded fontSize="large" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;
