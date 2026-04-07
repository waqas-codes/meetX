import { useEffect, useRef, useState } from 'react';
import {
  connectSocket,
  disconnectSocket,
  joinRoom,
  leaveRoom,
  onUserJoined,
  onUserLeft,
  offUserJoined,
  offUserLeft,
  sendOffer,
  sendAnswer,
  sendIceCandidate,
  onOffer,
  onAnswer,
  onIceCandidate,
  offOffer,
  offAnswer,
  offIceCandidate,
} from '../services/socketService';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

export const useWebRTC = (meetingId) => {
  const [localStream, setLocalStream] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const originalStreamRef = useRef(null);
  const [peers, setPeers] = useState(new Map());
  const peerConnections = useRef(new Map());

  const createPeerConnection = (userId) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);

    if (isScreenSharing && screenStream) {
      screenStream.getTracks().forEach((track) => {
        pc.addTrack(track, screenStream);
      });
    } else if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    pc.ontrack = (event) => {
      setPeers((prev) => {
        const newPeers = new Map(prev);
        const peer = newPeers.get(userId) || { userId };
        peer.stream = event.streams[0];
        newPeers.set(userId, peer);
        return newPeers;
      });
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendIceCandidate(userId, event.candidate);
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
        setPeers((prev) => {
          const newPeers = new Map(prev);
          newPeers.delete(userId);
          return newPeers;
        });
      }
    };

    return pc;
  };

  const removePeer = (userId) => {
    const pc = peerConnections.current.get(userId);
    if (pc) {
      pc.close();
      peerConnections.current.delete(userId);
    }
    setPeers((prev) => {
      const newPeers = new Map(prev);
      newPeers.delete(userId);
      return newPeers;
    });
  };

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!meetingId || !localStream) return;

    connectSocket();
    joinRoom(meetingId);

    onUserJoined(async (userId) => {
      console.log('User joined, creating offer:', userId);
      const pc = createPeerConnection(userId);
      peerConnections.current.set(userId, pc);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      sendOffer(userId, offer);
    });

    onUserLeft((userId) => {
      console.log('User left:', userId);
      removePeer(userId);
    });

    onOffer(async ({ sender, offer }) => {
      console.log('Received offer from:', sender);
      let pc = peerConnections.current.get(sender);
      if (!pc) {
        pc = createPeerConnection(sender);
        peerConnections.current.set(sender, pc);
      }

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendAnswer(sender, answer);
    });

    onAnswer(async ({ sender, answer }) => {
      console.log('Received answer from:', sender);
      const pc = peerConnections.current.get(sender);
      if (pc) {
        await pc.setRemoteDescription(answer);
      }
    });

    onIceCandidate(async ({ sender, candidate }) => {
      console.log('Received ICE candidate from:', sender);
      const pc = peerConnections.current.get(sender);
      if (pc) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (error) {
          console.error('Error adding ICE candidate:', error);
        }
      }
    });

    return () => {
      offUserJoined();
      offUserLeft();
      offOffer();
      offAnswer();
      offIceCandidate();
      leaveRoom(meetingId);

      peerConnections.current.forEach((pc) => pc.close());
      peerConnections.current.clear();

      disconnectSocket();
    };
  }, [meetingId, localStream]);

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        const newState = !audioTrack.enabled;
        audioTrack.enabled = newState;
        setIsAudioEnabled(newState);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        const newState = !videoTrack.enabled;
        videoTrack.enabled = newState;
        setIsVideoEnabled(newState);
      }
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing and revert to camera
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }
      setScreenStream(null);
      setIsScreenSharing(false);
      
      // Replace tracks in all peer connections with camera
      peerConnections.current.forEach((pc) => {
        const sender = pc.getSenders().find((s) => 
          s.track && s.track.kind === 'video'
        );
        if (sender && localStream) {
          const videoTrack = localStream.getVideoTracks()[0];
          if (videoTrack) {
            sender.replaceTrack(videoTrack);
          }
        }
      });
    } else {
      // Start screen sharing
      try {
        // Check if getDisplayMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          alert('Screen sharing is not supported in this browser');
          return;
        }

        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false, // Audio often causes issues, disable for now
        });
        
        const videoTrack = stream.getVideoTracks()[0];
        if (!videoTrack) {
          throw new Error('No video track obtained from screen share');
        }

        videoTrack.onended = () => {
          // Use functional update to get current state
          setIsScreenSharing((current) => {
            if (current) {
              toggleScreenShare();
            }
            return current;
          });
        };
        
        setScreenStream(stream);
        setIsScreenSharing(true);
        
        // Replace tracks in all peer connections with screen
        peerConnections.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => 
            s.track && s.track.kind === 'video'
          );
          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        });
      } catch (error) {
        console.error('Error starting screen share:', error.name, error.message);
        if (error.name === 'NotAllowedError') {
          alert('Screen sharing permission was denied. Please allow screen sharing and try again.');
        } else {
          alert(`Failed to start screen sharing: ${error.message}`);
        }
      }
    }
  };

  return {
    localStream,
    screenStream,
    peers: Array.from(peers.values()),
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
  };
};
