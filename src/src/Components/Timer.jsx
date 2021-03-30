import React, { useState, useEffect } from 'react';
import { timeout, reset } from '../Game'

export default function Timer( { player, active }) {
    const [time, setTime] = useState({ minutes: 10, seconds: 0 });
    let gameActive = true;
    function reset() {
        setTime({ minutes: 10, seconds: 0 });
    }

    useEffect(() => {
        let interval = null;
        if (active && gameActive) {
            interval = setInterval(() => {
                if (time.seconds > 0) {
                    setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
                }
                else if (time.minutes > 0) {
                    setTime({ minutes: time.minutes - 1, seconds: 59 });
                }
                else {
                    timeout();
                    gameActive = false;
                    clearInterval(interval);
                }
            }, 1000);
        } else if (!active && time.seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [active, time]);

    return (
        <div>
            <h2 className="timer">{player === 'w' ? "White: " : "Black: "}{time.minutes}:{time.seconds < 10 ? `0${time.seconds}`: time.seconds}</h2>
        </div>
    )
}
