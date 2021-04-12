const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const multiplayerLogic = require('./multiplayerLogic.js')
const colors = require('colors')

//get exports for defining users
const {getCurrentUser, userLeave, userJoin } = require('./user.js');

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//TODO: access control headears 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.on('connection', (socket) => {
    console.log('a user connected');

    //TODO: multiplayerLogic
    //multiplayerLogic.initializeGame(io, socket);


    //io stuff for chat
    //Event when user joins room
    socket.on("joinRoom", ({username, roomname}) => {
        //* create user
        const user = userJoin(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(user.room);

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

    //when somebody sends text
    socket.on("chat", (text) => {
       //* get user room and emit message
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            text: text
        });
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
    //run the server at the location
    console.log(`Server is running in ${process.env.NODE_ENV} on *: ${port}`.yellow.bold);
});
