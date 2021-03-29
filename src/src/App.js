import React, {useEffect, useState} from 'react';
import './App.css';
import {gameSubject} from './Game'
import Board from './Components/Board'
import ResignButton from './Components/ResignButton'
import Timer from './Components/Timer'
function App() {
  const [board, setBoard] = useState([])
  useEffect(() => {
    const subscribe = gameSubject.subscribe(game =>
      setBoard(game.board)
    )
    return () => subscribe.unsubscribe()
  }, [])
  return (
    <div className="container">
      <div className="board-container">
        <Board board={board}/>
      </div>
      <div className="button-1">
          <ResignButton player='w'/>
      </div>
      <div className="timer-1">
          <Timer player='w'/>
      </div>
    </div>
  )
}

export default App;
