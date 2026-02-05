const socketIo = require('socket.io');

function initSocket(server) {
  const io = socketIo(server, {
    cors: { origin: "*" }
  });

  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('typing', (data) => {
      socket.broadcast.emit('userTyping', data);
    });

    socket.on('newMessage', (message) => {
      io.emit('messageReceived', message);
    });
  });
}

module.exports = initSocket;
