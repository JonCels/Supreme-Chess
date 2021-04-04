import React, { useState, useEffect, useRef } from 'react'

function Chat({ username, roomname, socket}){
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
        let temp = messages;
        temp.push({
            userId: data.userId,
            username: data.username,
            text: data.text
        });
            setMessages([...temp])
       });
    },[socket])

    const sendMessage = () => {
          if (text !== ""){
              socket.emit("chat",text);
              setText("");
          }
      };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behaviour : "smooth"});
    };

    useEffect(scrollToBottom, [messages]);

    console.log("messages : ", messages);

    return (
        <div className="chat">
            <div className="user-name">
                <h2>
                    {username} <span style={{fontSize: "0.7rem"}}>in {roomname}</span>
                </h2>
            </div>
            <div className="chat-message">
                { messages.map((i, num) => {
                    if (i.username === username) {
                        return (
                            <div key={num}>
                                <span className="span-message">{i.username}</span>
                                <p className="p-message">{i.text}</p>
                            </div>
                        );
                     } else {
                       return (
                           <div key={num}>
                                <span className="span-message-right">{i.username}</span>
                                <p className="p-message-right">{i.text}</p>
                           </div>
                       );
                     }
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="send">
                <input
                    placeholder="enter your message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if(e.key === "Enter"){
                            sendMessage();
                        }
                    }} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
export default Chat;