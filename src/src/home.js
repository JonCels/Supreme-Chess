import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Homepage({ socket }) {
    const [username, setusername] = useState("")
    const [roomname, setroomname] = useState("")

    const sendData = () => {
        if (username !== "" && roomname !== "") {
            socket.emit("joinRoom", {username, roomname });
        } else {
            alert("username and roomname are must!");
        }
    };

    return(
    <div className="homepage">
        <h1> Welcome to Supreme Chess! </h1>
        <input
            placeholder = "user name"
            value={username}
            onChange={(e) => setusername(e.target.value)}
        />
        <input
            placeholder="Room name"
            value={roomname}
            onChange={(e) => setroomname(e.target.value)}
        />
        <Link to={`/game/${roomname}/${username}` === `/game//` ? '/' : `/game/${roomname}/${username}` }>
            <button onClick={sendData}>Join</button>
        </Link>
     </div>
    );
}

export default Homepage;
