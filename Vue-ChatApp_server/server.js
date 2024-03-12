const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const socketIO = require('socket.io');
const io = require('socket.io')(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
		console.log('Message sent');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
