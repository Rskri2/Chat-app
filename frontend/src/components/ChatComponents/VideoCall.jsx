import { useEffect, useState, useRef, useCallback } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export default function VideoCall({ socket }) {
  const [room, setRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const peerConnection = useRef(null);
  const handleStartCall = useCallback(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
    peerConnection.current = pc;
  }, []);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
    socket.emit("join-room", room);
    handleStartCall();
  }, [room, handleStartCall, socket]);

  const handleCancel = useCallback(() => {
    if(peerConnection && peerConnection.current){
      peerConnection.current.ontrack = null;
      peerConnection.current.onnegotiationneeded = null;
      peerConnection.current.onicecandidate = null;
      if (localStream) localStream.getTracks().forEach((track) => track.stop());
      
      if (remoteStream) remoteStream.getTracks().forEach((track) => track.stop());
      peerConnection.current.close();
      peerConnection.current = null;
      setIsModalOpen(false);
    }
  }, []);

  const createOffer = useCallback(async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(
      new RTCSessionDescription(offer)
    );
    return offer;
  }, []);

  const createAnswer = useCallback(async (offer) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(
      new RTCSessionDescription(answer)
    );
    return answer;
  }, []);
  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream);
  }, []);
  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      await getUserMediaStream();
      const ans = await createAnswer(offer);
      socket.emit("call-accept", { from, answer: ans });
    },
    [createAnswer, socket, getUserMediaStream]
  );
  const handleUserJoined = useCallback(
    async (email) => {
      await getUserMediaStream();
      const offer = await createOffer();
      socket.emit("call-user", { email, offer });
    },
    [createOffer, socket, getUserMediaStream]
  );
  const sendStream = useCallback(() => {
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });
  }, [localStream]);
  const handleCallAccepted = useCallback(async (data) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(data)
    );
  }, []);

  const handleIceCandidate = useCallback(async (candidate) => {
    await peerConnection.current.addIceCandidate(candidate);
  }, []);
  const handleRenegotiation = useCallback(
    async ({ offer, to }) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);
      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("send-rengotiation-answer", { answer, to });
    },
    [socket]
  );
  const handleRenegotiationAns = useCallback(async ({ answer }) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("user-joined", handleUserJoined);
      socket.on("incoming-call", handleIncomingCall);
      socket.on("call-accepted", handleCallAccepted);
      socket.on("ice-candidate", handleIceCandidate);
      socket.on("receive-renegotiation-offer", handleRenegotiation);
      socket.on("receive-rengotiation-answer", handleRenegotiationAns);
    }

    return () => {
      if (socket) {
        socket.off("user-joined", handleUserJoined);
        socket.off("incoming-call", handleIncomingCall);
        socket.off("call-accepted", handleCallAccepted);
        socket.off("ice-candidate", handleIceCandidate);
        socket.off("receive-renegotiation-offer", handleRenegotiation);
        socket.off("receive-rengotiation-answer", handleRenegotiationAns);
      }
    };
  }, [
    socket,
    handleCallAccepted,
    handleIceCandidate,
    handleUserJoined,
    handleRenegotiation,
    handleRenegotiationAns,
    handleIncomingCall,
  ]);

  useEffect(() => {
    if (isModalOpen && peerConnection && peerConnection.current) {
      peerConnection.current.ontrack = async (event) => {
        setRemoteStream(event.streams[0]);
      };
      peerConnection.current.onicecandidate = async (event) => {
        if (event.candidate)
          socket.emit("ice-candidates", { room, candidate: event.candidate });
      };
      peerConnection.current.onnegotiationneeded = async () => {
        const offer = await peerConnection.current.createOffer();
        peerConnection.current.setLocalDescription(offer);

        socket.emit("send-renegotiation-offer", { to: room, offer });
      };
    }
  }, [isModalOpen, peerConnection, room, socket, remoteStream, localStream]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
    <div
    style = {{
        height: "100vh",
        position: "fixed",
        insetInlineStart: 0,
             left: "80px",
             top: "50px",
             bottom: 0,
             scrollbarWidth: "thin",
             scrollbarColor: "unset",
             background: "white",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
         }}
     >

      <input
        style={{
          color: "black",
          border: "2px solid black",
          height: "5vh",
          margin: "5px",
          borderRadius: "10px",
        }}
        placeholder="Enter your room no"
        onChange={(e) => setRoom(e.target.value)}
      ></input>
      <button
        onClick={showModal}
        style={{
          color: "black",
          height: "5vh",
          border: "2px solid black",
          backgroundColor: "yellow",
          cursor: "pointer",
          borderRadius: "10px",
        }}
      >
        Enter the room
      </button>
        </div>
      <Modal
        title="video calling tab"
        open={isModalOpen}
        onCancel={handleCancel}
        width="50%"
        style={{display:"flex", alignItems:"center", justifyContent:"center"}}
        footer={
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/end-call.png"
            alt="end-call"
            onClick={handleCancel}
          />
        }
      >
        {localStream && <button onClick={sendStream}>Share the video</button>}
        {localStream && <ReactPlayer  url={localStream} playing muted controls/>}
        {remoteStream && <ReactPlayer style={{width:"500px"}} url={remoteStream} playing controls/>}
      </Modal>
    </div>
  );
}

VideoCall.propTypes = {
  socket: PropTypes.object,
};
