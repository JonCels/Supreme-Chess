var io
var chatSocket 

const users = []

//add users
function userJoin (id,username, room){
    const user = {id, username, room};

    users.push(user);
    console.log(users, "users");

    return user
}

//output users on the server side (to check against)
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
