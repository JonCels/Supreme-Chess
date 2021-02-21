import React from 'react'
import Square from './Square'
import Piece from './Piece'
import { useDrop } from 'react-dnd'
import { PieceTypes } from '../PieceTypes'

export default function BoardSquare({ piece, black, pos }) {
    function test(x, y) {
        console.log("Moving to square at coordinates: " + x, + " " + y);
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
        drop: () => test([pos.x, pos.y])
    })
    return (
        <div className="board-square" ref={drop}>
            <Square black={black}>
                {piece && <Piece piece={piece} />}
            </Square>
        </div>
    )

}