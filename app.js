const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`💬 Server on port ${PORT}`));

const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));

let connectedUsers = {}; // Stores { socket.id: roomID }
let connectedids = new Set(); // Stores unique socket IDs

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    connectedids.add(socket.id);

    io.emit('client-total', connectedids.size);


    socket.on('joinRoom', (roomID) => {
        socket.join(roomID);
        connectedUsers[socket.id] = roomID;
        console.log(`${socket.id} joined room: ${roomID}`);
    });

    socket.on('message', (data) => {
        const roomID = connectedUsers[socket.id];
        if (roomID) {
            console.log(`Message in room ${roomID}:`, data);
            socket.to(roomID).emit('chat-message', data); 
        }
    });


    socket.on('feedback', (data) => {
        const roomID = connectedUsers[socket.id];
        if (roomID) {
            socket.to(roomID).emit('feedback', data);
        }
    });


    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        connectedids.delete(socket.id);
        delete connectedUsers[socket.id];
        io.emit('client-total', connectedids.size);
    });
});
