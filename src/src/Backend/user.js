var io
var chatSocket //same as gameSocket for now

const users = []

//const initializeGame = (sio,socket) =

function userJoin (id,username, room, isCreator){
    const user = {id, username, room, isCreator};

    users.push(user);
    console.log(users, "users");

    return user
}

console.log("user out", users);

//Get current user
function getCurrentUser(id){
    return users.find((user) => user.id === id);
}

//User leaves chat
function userLeave(id){
    const index = users.findIndex((user) => user.id === id);

    if(index != -1){
        return users.splice(index,1)[0]
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
};
