const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const multiplayerLogic = require('./multiplayerLogic.js')
const color = require('colors')
const cors = require('cors');
const {getCurrentUser, userLeave, userJoin } = require('./user.js');

const port = process.env.PORT || 8000;

const app = express();
//app.use(cors({origin: "http://localhost:8000"}));

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    //multiplayerLogic.initializeGame(io, socket);


    // the username can be included in the reciever
    //io stuff for chat
    socket.on("joinRoom", ({username, roomname}) => {
        //* create user
        socket.join(roomname);
        var room = io.sockets.adapter.rooms.get(roomname); 

        //console.log(io.sockets.adapter.rooms.get(roomname))
        if(room === undefined){
            socket.emit('status', "This session does not exist");
            return
        }
        var isCreator = (room.size <= 1) 
        console.log(socket.id, "=id");

        const user = userJoin(socket.id, username, roomname, isCreator);

        //* emit message to user to welcome him/her
        socket.emit("message", {
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`
        });

        //* Broadcast message to everyone except user that he has joined
        socket.broadcast.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            text: `${user.username} has joined the chat`
        });
    });

    //when somebody send text
    socket.on("chat", (text) => {
       //* get user room and emit message
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            text: text
        });
    });

    //when someone moves
    socket.on("new move", (data) => {
        const r = data.roomname
        console.log(r);
        io.to(r).emit('opponent move', data)
    });

    //Disconnect, when user leave room
    socket.on("disconnect", (text) => {
       //* get user room and emit message
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit("message", {
                userId: user.id,
                username: user.username,
                text: `${user.username} has left the chat`
            });
        }
    });

});


server.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on *: ${port}`.yellow.bold);
});
