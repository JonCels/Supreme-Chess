import React from 'react';
export default function ResignButton({ player }) {
    function resignGame() {
        if (player === 'w') {
            //resign game for white
            console.log("White resigns")
        }
        else if (player === 'b') {
            //resign game for black
            console.log("Black resigns")
        }
    }
    return (
        <button onClick={resignGame} className="resign">

            Resign
        </button>
    )
}
