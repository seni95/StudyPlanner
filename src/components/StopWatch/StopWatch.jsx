import React, { useState } from 'react'

export default function StopWatch() {
    const [hour,setHour] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState(0);
    const [isStart, setIsstart] = useState(false);


    const startTimer=()=>{
        isStart?setIsstart(false):setIsstart(true);
    }
return (
    <div>
        <span>{hour<10?"0"+hour:hour}</span>:
        <span>{minutes<10?"0"+minutes:minutes}</span>:
        <span>{seconds<10?"0"+seconds:seconds}</span>
        <button onClick={startTimer}>{isStart?"stop":"start"}</button>
    </div>
  )
}
