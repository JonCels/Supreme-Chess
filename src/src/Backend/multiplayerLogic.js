var io
var gameSocket

var gamesInSession = []

const initializeGame = (sio,client) => {
    io = io
    gameSocket = client
    
    gamesInSession.push(gameSocket);

    //disconnection
    gameSocket.on('disconnect', onDisconnect)
    //new move
    gameSocket.on('new move', newMove)
    //create new game
    gameSocket.on('createNewGame', createNewGame)
    //player Joins a game
    gameSocket.on('playerJoinGame', playerJoinGame)
    //requests for username
    gameSocket.on('request username', requestUserName)
    //request for received username
    gameSocket.on('recieved username', receivedUserName)
    
    //handling the chat work
    //chatStuff()
}

function playerJoinGame(idData){
    var sock = this;
    var room = io.sockets.adapter.rooms[idData.gameId]

    if(room === undefined){
        this.emit('status', "This game session does not exist");
        return
    }
    
    if(room.length < 2){
        
        idData.mySocketId = sock.id;

        sock.join(idData.gameId);

        console.log(room.length);

        if(room.length === 2){
            io.sockets.in(idData.gameId).emit('start game', idData.userName);
        }

        io.sockets.in(idData.gameId).emit('player Joined Room', idData);
    } else {
        this.emit('status', "There are already 2 people in this room");
    }
}

function createNewGame(gameId){
    //Return the Room ID (gameId) and the socket ID
    this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});

    this.join(gameId);
}

function newMove(move){
    const gameId = move.gameId
    io.to(gameId).emit('opponent move', move)
}

function onDisconnect(){
     var i = gamesInSession.indexOf(gameSocket);
     gamesInSession.splice(i,1); 
}

function requestUserName(gameId){
    io.to(gameId).emit('give userName', this.id);
}

function recievedUserName(data){
    data.socketId = this.id
    io.to(data.gameId).emit('get Opponent Username', data);
}

exports.initializeGame = initializeGame
