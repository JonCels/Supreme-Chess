import React from 'react'
import { useDrag } from 'react-dnd'

export default function Piece({
    piece: { type, color },
    position,
}) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: 'piece',
            id: `${position}_${type}_${color}`,
        },
        collect: (monitor) => {
            return { isDragging: !!monitor.isDragging() }
        },
    })
    const pieceImg = `./assets/${type}_${color}.png`
    return (
        <>
            <div
                className="piece-container"
                ref={drag}
                style={{ opacity: isDragging ? 0 : 1 }}
            >
                <img src={pieceImg} alt="" className="piece" />
            </div>
        </>
    )
}