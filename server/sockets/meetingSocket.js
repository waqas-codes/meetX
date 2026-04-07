module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (meetingId) => {
      socket.join(meetingId);
      console.log(`User ${socket.id} joined room ${meetingId}`);
      
      socket.to(meetingId).emit('user-joined', socket.id);
    });

    socket.on('leave-room', (meetingId) => {
      socket.leave(meetingId);
      console.log(`User ${socket.id} left room ${meetingId}`);
      
      socket.to(meetingId).emit('user-left', socket.id);
    });

    socket.on('offer', ({ target, offer }) => {
      socket.to(target).emit('offer', { sender: socket.id, offer });
    });

    socket.on('answer', ({ target, answer }) => {
      socket.to(target).emit('answer', { sender: socket.id, answer });
    });

    socket.on('ice-candidate', ({ target, candidate }) => {
      socket.to(target).emit('ice-candidate', { sender: socket.id, candidate });
    });

    socket.on('chat-message', ({ meetingId, message }) => {
      socket.to(meetingId).emit('chat-message', {
        sender: socket.id,
        message,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
