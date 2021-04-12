
import React from 'react'
import Square from './Square'
import { move } from '../Game'

import q_w from './assets/q_w.png'
import r_w from './assets/r_w.png'
import b_w from './assets/b_w.png'
import n_w from './assets/n_w.png'

import q_b from './assets/q_b.png'
import r_b from './assets/r_b.png'
import b_b from './assets/b_b.png'
import n_b from './assets/n_b.png'

const promotionPieces = ['r', 'n', 'b', 'q']

// handles the pawn promotion for each piece
export default function Promote({
    promotion: { from, to, color },
}) {
    var img = null;
    function getImg(p) {
        switch(color) {
            case 'w':
                switch(p) {
                    case 'q':
                        img = q_w;
                        break;
                    case 'r':
                        img = r_w;
                        break;
                    case 'b':
                        img = b_w;
                        break;
                    case 'n':
                        img = n_w;
                        break;
                }
                break;

            case 'b':
                switch(p) {
                    case 'q':
                        img = q_b;
                        break;
                    case 'r':
                        img = r_b;
                        break;
                    case 'b':
                        img = b_b;
                        break;
                    case 'n':
                        img = n_b;
                        break;
                }
                break;
        }
    }

    return (
        <div className="board">
            {promotionPieces.map((p, i) => (
                <div key={i} className="promote-square">
                    {getImg(p)}
                    <Square black={i % 3 === 0}>
                        <div
                            className="piece-container"
                            onClick={() => move(from, to, p)}
                        >
                            <img
                                src={img}
                                alt=""
                                className="piece cursor-pointer"
                            />
                        </div>
                    </Square>
                </div>
            ))}
        </div>
    )
}
