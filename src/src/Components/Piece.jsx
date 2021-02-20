import React from 'react'

export default function Piece({ piece: { type, color } }) {
    const pieceImg = `./assets/${type}_${color}.png`
    return (
        <div className="piece-container">
            <img src={pieceImg} alt="" className="piece" />
        </div>
    )
}