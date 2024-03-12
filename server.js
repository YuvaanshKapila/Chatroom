const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Event listener for user joining the chat
    socket.on('user joined', (username) => {
        io.emit('user joined', username);
    });

    // Event listener for receiving chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Event listener for user disconnecting
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
