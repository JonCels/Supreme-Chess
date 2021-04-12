import React, { useState } from 'react';
import { drawGame } from '../Game'

// creates the draw button
export default function DrawButton() {
    const [draw, setDraw] = useState(false)
    const [drawOffered, setDrawOffered] = useState(false);

    // offers the draw
    function offerDraw() {
        setDrawOffered(true);
    }

    // accepts the draw
    function acceptDraw() {
        setDraw(true);
        setDrawOffered(false);
        drawGame();
    }

    // declines the draw
    function declineDraw() {
        setDraw(false);
        setDrawOffered(false);
    }

    return (
        <div>
            {!drawOffered &&
                <button onClick={offerDraw} className="draw">
                    Offer Draw
                </button>
            }
            {drawOffered &&
                <div >
                    <button className="draw-option-accept" onClick={acceptDraw} >
                        <img src={require('./assets/checkmark.png')} height="25" alt=""/>
                    </button>
                    <button className="draw-option-decline" onClick={declineDraw}>
                        <img src={require('./assets/ex.png')} height="25" alt=""/>
                    </button>
                </div>
            }
        </div>
    )
}
