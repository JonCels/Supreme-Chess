const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
//var socket = io();

//export function initChat() {
//    socket = io();   
//}

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: '+msg);
        io.emit('chat message',msg);
    });
    
    socket.on('disconnect',() => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`listening on *: ${port}`);
});

