import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    const SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    socket = io(SERVER_URL, {
      withCredentials: true, // Required for CORS with credentials
      transports: ['websocket', 'polling'], // Fallback to polling if websocket fails
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    // Add connection event listeners for debugging
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });
    
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinRoom = (meetingId) => {
  if (socket) {
    socket.emit('join-room', meetingId);
  }
};

export const leaveRoom = (meetingId) => {
  if (socket) {
    socket.emit('leave-room', meetingId);
  }
};

export const onUserJoined = (callback) => {
  if (socket) {
    socket.on('user-joined', callback);
  }
};

export const onUserLeft = (callback) => {
  if (socket) {
    socket.on('user-left', callback);
  }
};

export const offUserJoined = () => {
  if (socket) {
    socket.off('user-joined');
  }
};

export const offUserLeft = () => {
  if (socket) {
    socket.off('user-left');
  }
};

export const sendOffer = (target, offer) => {
  if (socket) {
    socket.emit('offer', { target, offer });
  }
};

export const sendAnswer = (target, answer) => {
  if (socket) {
    socket.emit('answer', { target, answer });
  }
};

export const sendIceCandidate = (target, candidate) => {
  if (socket) {
    socket.emit('ice-candidate', { target, candidate });
  }
};

export const onOffer = (callback) => {
  if (socket) {
    socket.on('offer', callback);
  }
};

export const onAnswer = (callback) => {
  if (socket) {
    socket.on('answer', callback);
  }
};

export const onIceCandidate = (callback) => {
  if (socket) {
    socket.on('ice-candidate', callback);
  }
};

export const offOffer = () => {
  if (socket) {
    socket.off('offer');
  }
};

export const offAnswer = () => {
  if (socket) {
    socket.off('answer');
  }
};

export const offIceCandidate = () => {
  if (socket) {
    socket.off('ice-candidate');
  }
};

// Chat functions
export const sendChatMessage = (meetingId, message) => {
  if (socket) {
    socket.emit('chat-message', { meetingId, message });
  }
};

export const onChatMessage = (callback) => {
  if (socket) {
    socket.on('chat-message', callback);
  }
};

export const offChatMessage = () => {
  if (socket) {
    socket.off('chat-message');
  }
};
