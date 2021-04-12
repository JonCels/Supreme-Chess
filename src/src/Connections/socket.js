import { io } from 'socket.io-client'

const URL = 'http://localhost:8000'

export const socket = io(URL);

var mySocketId

socket.on('createNewGame', statusUpdate => {
    console.log("A new game has been created! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " +
        statusUpdate.mySocketId)
    mySocketId = statusUpdate.mySocketId
})

//mySocketId is not used at the moment for export
export default { socket, mySocketId } ;
