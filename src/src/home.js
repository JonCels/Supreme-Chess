import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@material-ui/core';

/*Render Homepage*/
function Homepage({ socket }) {
    const [username, setusername] = useState("")
    const [roomname, setroomname] = useState("")

    //Send Data functionality
    const sendData = () => {
        if (username !== "" && roomname !== "") {
            socket.emit("joinRoom", {username, roomname });
        } else {
            alert("username and roomname are must!");
        }
    };

    //Render input sections
    //and send to back-end
    return(
    <div className="homepage">
        <p className="welcome">Welcome to Supreme Chess</p>
        <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
        />
        <Input
            placeholder="Room Name"
            value={roomname}
            onChange={(e) => setroomname(e.target.value)}
        />
        <Link to={`/chat/${roomname}/${username}`}>
            <Button variant="contained" color="primary" onClick={sendData}>Join</Button>
        </Link>
     </div>
    );
}

export default Homepage;
