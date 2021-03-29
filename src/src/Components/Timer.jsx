import React, { useState, useEffect } from 'react';

export default function Timer( {player}) {
    const [time, setTime] = useState({ minutes: 10, seconds: 0 });
    const [isActive, setIsActive] = useState(true);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setTime({ minutes: 10, seconds: 0 });
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (time.seconds > 0) {
                    setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
                }
                else if (time.minutes > 0) {
                    setTime({ minutes: time.minutes - 1, seconds: 59 });
                }
                else {
                    console.log("Timer done");
                    toggle();
                }

            }, 1000);
        } else if (!isActive && time.seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    return (
        <div>
            <h1>{player === 'w' ? "White: " : "Black: "}{time.minutes}:{time.seconds < 10 ? `0${time.seconds}`: time.seconds}</h1>
        </div>
    )
}
