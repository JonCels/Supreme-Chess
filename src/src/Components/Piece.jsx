import React from 'react'
import { useDrag } from 'react-dnd';

export default function Piece({ piece: { type, color } }) {
    const pieceImg = `./assets/${type}_${color}.png`
    const [{isDragging}, drag] = useDrag({
        item: {type: type},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
    })
    return (
        <div className="piece-container">
            <img src={pieceImg} className="piece" ref={drag} style={{opacity: isDragging ? 0.5 : 1}}/>
        </div>
    )
}