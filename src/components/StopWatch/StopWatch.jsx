import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useCounter from '../../hooks/useCounter';

export default function StopWatch({todo,updateTime,time}) {
    const [hour,setHour] = useState(time===null?0:time[0]);
    const [minutes,setMinutes] = useState(time===null?0:time[1]);
    const [seconds,setSeconds] = useState(time===null?0:time[2]);
    const [isStart, setIsstart] = useState(false);
    const {count,start,stop,reset} = useCounter(0,1000);
    const [id, setId] = useState(todo);

    const uploadTime = ()=>{
        const resultH  = hour<10?"0"+hour:hour;
        const resultM = minutes<10?"0"+minutes:minutes;
        const resultS = seconds<10?"0"+seconds:seconds;
        const result  = resultH+":"+resultM+":" +resultS;
        updateTime(id,result);
    }
   

    // useEffect(uploadTime,[seconds]);

    const operate = ()=>{
        const currentHours = Math.floor(count/3600);
        const calculatingMinutes = Math.floor(count/60);
        const currentMinutes = calculatingMinutes%60;
        const currentSeconds = count % 60;
        setHour(currentHours);
        setMinutes(currentMinutes);
        setSeconds(currentSeconds);
    }
    
    useEffect(operate,[count]);
return (
    <div>
        <span>{hour<10?"0"+hour:hour}</span>:
        <span>{minutes<10?"0"+minutes:minutes}</span>:
        <span>{seconds<10?"0"+seconds:seconds}</span>
        {isStart?
        <button onClick={()=>{stop(); setIsstart(false);}}>stop</button>
        :
        <button onClick={()=>{start(); setIsstart(true);}}>start</button>    }
        <div>{time}</div>
    </div>
  )
}


