import { io } from 'socket.io-client'

const URL = 'Backend Connection'

const socket = io(URL, {autoConnect = false});

var mySocketId

socket.on('createNewGame', statusUpdate => {
    console.log("A new game has been created! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " +
                statusUpdate.mySocketId)
    mySocketId = statusUpdate.mySocketId
})

export default { socket, mySocketId } ;
