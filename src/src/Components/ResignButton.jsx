import React from 'react';
import { resignGame } from '../Game'

// class for the resign button
export default function ResignButton({ player }) {
    function resign() {
        resignGame(player);
    }
    return (
        <button onClick={resign} className="resign">
            Resign
        </button>
    )
}
