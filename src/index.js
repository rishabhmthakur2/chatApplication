const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

io.on('connection', ()=>{
    console.log('New Web Socket Connection');
});

server.listen(3000, () => {
    console.log('Server listening on 3000');
});