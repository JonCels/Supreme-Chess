import React from 'react'
import Square from './Square'
import Piece from './Piece'
import { useDrop } from 'react-dnd'
import { PieceTypes } from '../PieceTypes'

export default function BoardSquare({ piece, pos }) {
    function emitCoords(x, y) {
        console.log("Moving to square at coordinates: " + x + ", " + y);
    }
    const [, drop] = useDrop({
        accept: [
            PieceTypes.PAWN, 
            PieceTypes.KNIGHT,
            PieceTypes.BISHOP,
            PieceTypes.ROOK,
            PieceTypes.QUEEN,
            PieceTypes.KING
        ],
        drop: () => emitCoords(pos.x, pos.y)
    })
    return (
        <div className="board-square" ref={drop}>
            <Square black={(pos.x + pos.y) % 2 === 1}>
                {piece && <Piece piece={piece} />}
            </Square>
        </div>
    )
}