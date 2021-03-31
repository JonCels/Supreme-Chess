import React, { useEffect, useState } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame } from './Game'
import Board from './Components/Board'
import Timer from './Components/Timer'
import DrawButton from './Components/DrawButton'
import ResignButton from './Components/ResignButton'

function App() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
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
      <div>
          <Timer player='b' active={!timerActive} gameActive={!isGameOver} resetGame={resetTimer}/>
          <Timer player='w' active={timerActive} gameActive={!isGameOver} resetGame={resetTimer}/>
          <DrawButton />
          <ResignButton player={turn}/>
      </div>
    </div>
  )
}

export default App
