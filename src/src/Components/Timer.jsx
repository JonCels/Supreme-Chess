import React, { useState, useEffect } from 'react';
import { timeout } from '../Game'

export default function Timer( { player, active, gameOver }) {
    let initMinutes = 10;
    let initSeconds = 0;
    const [time, setTime] = useState({ minutes: initMinutes, seconds: initSeconds });

    // reset the timer
    function reset() {
        setTime({ minutes: initMinutes, seconds: initSeconds });
    }

    // triggers if the game ends, the time changes, and toggles when a turn changes
    useEffect(() => {
        let interval = null;
        if (active) {
            interval = setInterval(() => {
                if (gameOver) {
                    clearInterval(interval);
                }
                else if (time.seconds > 0) {
                    setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
                }
                else if (time.minutes > 0) {
                    setTime({ minutes: time.minutes - 1, seconds: 59 });
                }
                else {
                    timeout();
                    clearInterval(interval);
                }
            }, 1000);
        } else if (!active && time.seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [active, time, gameOver]);

    // resets when the game ends
    useEffect(() => {
        reset();
    }, [gameOver]);

    // return the timer
    return (
        <div className="timer">
            <p>{player === 'w' ? "White: " : "Black: "}{time.minutes}:{time.seconds < 10 ? `0${time.seconds}`: time.seconds}</p>
        </div>
    )
}
