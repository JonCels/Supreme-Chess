import React from 'react';
import BoardSquare from './BoardSquare';
export default function Board({board}) {
    function getXYPosition(i) {
        const x = i % 8
        const y = Math.abs(Math.floor(i / 8) - 7)
        return { x, y }
    }
    return (
        <div className="board">
            {board.flat().map((piece, i) => (
            <div key={i} className="square">
                <BoardSquare piece={piece} pos={getXYPosition(i)} />
            </div>
            ))}
        </div>
    )
}
