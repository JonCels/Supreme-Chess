import React, { useEffect, useState } from 'react'
import BoardSquare from './BoardSquare'

// creates the chess board
export default function Board({ board, turn }) {
    const [currBoard, setCurrBoard] = useState([])

    // flatten the board, and reverse board for opponents turn
    useEffect(() => {
        setCurrBoard(
            turn === 'w' ? board.flat() : board.flat().reverse()
        )
    }, [board, turn])

    // get xy position using square index 
    function getXYPosition(i) {
        const x = turn === 'w' ? i % 8 : Math.abs((i % 8) - 7)
        const y =
            turn === 'w'
                ? Math.abs(Math.floor(i / 8) - 7)
                : Math.floor(i / 8)
        return { x, y }
    }

    // boolean function to check if the square is black or white
    function isBlack(i) {
        const { x, y } = getXYPosition(i)
        return (x + y) % 2 === 1
    }

    // get the chess letter notation
    function getPosition(i) {
        const { x, y } = getXYPosition(i)
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][
            x
        ]
        return `${letter}${y + 1}`
    }
    return (
        <div className="board">
            {currBoard.map((piece, i) => (
                <div key={i} className="square">
                    <BoardSquare
                        piece={piece}
                        black={isBlack(i)}
                        position={getPosition(i)}
                    />
                </div>
            ))}
        </div>
    )
}
