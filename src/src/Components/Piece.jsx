import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import k_w from './assets/k_w.png'
import q_w from './assets/q_w.png'
import r_w from './assets/r_w.png'
import b_w from './assets/b_w.png'
import n_w from './assets/n_w.png'
import p_w from './assets/p_w.png'

import k_b from './assets/k_b.png'
import q_b from './assets/q_b.png'
import r_b from './assets/r_b.png'
import b_b from './assets/b_b.png'
import n_b from './assets/n_b.png'
import p_b from './assets/p_b.png'

// creates a piece object
export default function Piece({
    piece: { type, color },
    position,
}) {
    // add drag and drop functionality
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: 'piece',
            id: `${position}_${type}_${color}`,
        },
        collect: (monitor) => {
            return { isDragging: !!monitor.isDragging() }
        },
    })

    var pieceImg = null
    switch(color) {
        case 'w':
            switch(type) {
                case 'k':
                    pieceImg = k_w;
                    break;
                case 'q':
                    pieceImg = q_w;
                    break;
                case 'r':
                    pieceImg = r_w;
                    break;
                case 'b':
                    pieceImg = b_w;
                    break;
                case 'n':
                    pieceImg = n_w;
                    break;
                case 'p':
                    pieceImg = p_w;
                    break;
            }
            break;

        case 'b':
            switch(type) {
                case 'k':
                    pieceImg = k_b;
                    break;
                case 'q':
                    pieceImg = q_b;
                    break;
                case 'r':
                    pieceImg = r_b;
                    break;
                case 'b':
                    pieceImg = b_b;
                    break;
                case 'n':
                    pieceImg = n_b;
                    break;
                case 'p':
                    pieceImg = p_b;
                    break;
            }
            break;
    }
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
