import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useCounter from '../../hooks/useCounter';
import {TfiAlarmClock} from 'react-icons/tfi';
import styles from './StopWatch.module.css';

export default function StopWatch({todo,updateTime,time}) {
    const [hour,setHour] = useState(time[0]);
    const [minutes,setMinutes] = useState(time[1]);
    const [seconds,setSeconds] = useState(time[2]);
    const [isStart, setIsstart] = useState(false);
    const [initialValue,setInitialValue] = useState(()=>{
        const initialHour = time[0]*3600;
        const initialMinutes = time[1]*60;
        const initialSeconds = time[2];
        const valueResult = initialHour+initialMinutes+initialSeconds;
        return valueResult;
    });
    const {count,start,stop,reset} = useCounter(initialValue,1000);
    const [id, setId] = useState(todo);

    const uploadTime = ()=>{
        const resultH  = hour<10?"0"+hour:hour;
        const resultM = minutes<10?"0"+minutes:minutes;
        const resultS = seconds<10?"0"+seconds:seconds;
        const result  = resultH+":"+resultM+":" +resultS;
        updateTime(id,result);
        
    }
   


    useEffect(uploadTime,[seconds]);

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
    <div className={styles.container}>
        <div className={styles.pic}>
        <TfiAlarmClock></TfiAlarmClock>
        </div>
        <div className={styles.content}>
        <span>{hour<10?"0"+hour:hour}</span>:
        <span>{minutes<10?"0"+minutes:minutes}</span>:
        <span>{seconds<10?"0"+seconds:seconds}</span>
        </div>
        {isStart?
        <button className={styles.button} onClick={()=>{stop(); setIsstart(false);}}>stop</button>
        :
        <button className={styles.button} onClick={()=>{start(); setIsstart(true);}}>start</button>    }
    </div>
  )
}


