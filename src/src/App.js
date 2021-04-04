import React, { useEffect, useState } from 'react'
import Chat from './Connections/chat'
import './App.css'
import Home from './home'
import { gameSubject, initGame, resetGame } from './Game'
import Board from './Components/Board'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { socket, mySocketId } from'./Connections/socket'
import Timer from './Components/Timer'
import DrawButton from './Components/DrawButton'
import ResignButton from './Components/ResignButton'

function Appmain(props){
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [isChatOn, setChatOn] = useState(true);
  const [timerActive, setTimerActive] = useState();
  const [resetTimer, setResetTimer] = useState();
  useEffect(() => {
    initGame()

    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
      setTimerActive(game.timerActive)
      setResetTimer(game.resetTimer)
    })


    return () => subscribe.unsubscribe()
  }, [])

    return (
    <div className="container">
      <div>
          <Timer player='b' active={!timerActive} gameOver={isGameOver} />
          <div>
              <DrawButton/>
              <ResignButton/>
          </div>
          <Timer player='w' active={timerActive} gameOver={isGameOver} />
      </div>
      {isGameOver && (
        <h2 className="vertical-text">
          GAME OVER
          <button onClick={resetGame}>
            <span className="vertical-text">NEW GAME</span>
          </button>
        </h2>
      )}
      <div>
        <p className="title">Supreme Chess</p>
        <div className="board-container">

          <Board board={board} turn={turn} />
        </div>
        <div>

        </div>
      </div>
      {result && <p className="vertical-text">{result}</p>}


      <div className="chat-board">
        <React.Fragment>
      { isChatOn && (
                <Chat
                    username={props.match.params.username}
                    roomname={props.match.params.roomname}
                    socket={socket}
                />
      )}
          <button className="chat-close" onClick = {() => setChatOn(!isChatOn)}>{(isChatOn) ? `Close` : `Open`}</button>
        </React.Fragment>
        </div>
        <div>{props.children}</div>
        </div>
    );
}

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/" exact>
            <Home socket={socket} />
        </Route>
        <Route
        path="/chat/:roomname/:username"
        component={Appmain} />
      </Switch>
      </div>
    </Router>
  )
}

export default App
