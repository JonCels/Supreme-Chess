import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame } from './Game'
import Board from './Components/Board'
//import { initChat } from './Backend/server'

function App() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
    
  const [isChatOn, setChatOn] = useState(true)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    initGame()
    
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
    })

      
    return () => subscribe.unsubscribe()
  }, [])

 // useEffect(() => {
 //     initChat()
 //     setChatOn(game.isChatOn)
 //     setMessages(game.messages)
  //},[])

  const sendMessage = () => {
        const newList = messages.concat(text)
        setMessages(newList)
        if (text !== ""){
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
    <div className="container">
      {isGameOver && (
        <h2 className="vertical-text">
          GAME OVER
          <button onClick={resetGame}>
            <span className="vertical-text"> NEW GAME</span>
          </button>
        </h2>
      )}
      <div className="board-container">
        <Board board={board} turn={turn} />
      </div>
      {result && <p className="vertical-text">{result}</p>}
      { isChatOn && (
          <div className="chat-board">
            <ul className="chat-messages">
            {messages.map((msg) => { return <li> {msg}  </li>})}
            </ul>
            <form className="chat-form" actions="">
          <input 
                    placeholder = "Enter Message"
                    className="chat-input" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    autoComplete="off"
                    onKeyPress = {(e) => {
                                    if(e.key === "Enter"){
                                        sendMessage();
                                    }
                                    }}
                    ></input> 
                <button className="chat-send" onClick = {sendMessage}>Send</button>
                <button className="chat-close" onClick = {() => setChatOn(!isChatOn)}>Close</button>
           </form>
          <div ref={messagesEndRef} /> 
          </div>
      )} 
    </div>
  )
}

export default App
