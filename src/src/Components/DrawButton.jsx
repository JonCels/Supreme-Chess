import React, { useState } from 'react';
import { drawGame } from '../Game'

export default function DrawButton() {
    const [draw, setDraw] = useState(false)
    const [drawOffered, setDrawOffered] = useState(false);
    
    function offerDraw() {
        setDrawOffered(true);
    }

    function acceptDraw() {
        setDraw(true);
        setDrawOffered(false);
        drawGame();
    }

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
                <div>
                    <button onClick={acceptDraw} className="resign">
                        <img src='./assets/checkmark.png' alt="" className="drawIcon" />
                    </button>
                    <button onClick={declineDraw} className="resign">
                        <img src='./assets/ex.png' alt="" className="drawIcon" />
                    </button>
                </div>
            }
        </div>
    )
}
