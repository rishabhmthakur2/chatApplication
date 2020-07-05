const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

io.on('connection', (socket) => {
    console.log('New Web Socket Connection');
    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');
    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message);
        callback();
    });
    socket.on('sendLocation',(location, callback)=>{
        io.emit('message', location);
        callback();
    });
    socket.on('disconnect',()=>{
        io.emit('message', 'A user has left');
    });
});


server.listen(3000, () => {
    console.log('Server listening on 3000');
});