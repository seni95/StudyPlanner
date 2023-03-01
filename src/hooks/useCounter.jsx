import React, { useCallback, useRef, useState } from 'react'

export default function useCounter(initialValue,ms) {
    const [count,setCount] = useState(initialValue);
    const intervalRef = useRef(null);
    const start = useCallback(()=>{
        if(intervalRef.current !== null){
            return;
        }
        const baseTime = Date.now();
        const initialV = count;
        intervalRef.current = setInterval(()=>{
            const tick = Math.floor((Date.now()-baseTime)/1000);
            setCount(initialV+tick);
        },ms)
    });

    const stop = useCallback(()=>{
        if(intervalRef.current==null){
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    });

    const reset = useCallback(()=>{
        stop();
        setCount(0);
    })



    

    

  return {count,start,stop,reset};
}
