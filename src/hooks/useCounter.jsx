import React, { useCallback, useRef, useState } from 'react'

export default function useCounter(initialValue,ms) {
    const [count,setCount] = useState(initialValue);
    const intervalRef = useRef(null);
    const start = useCallback(()=>{
        if(intervalRef.current !== null){
            return;
        }
        intervalRef.current = setInterval(()=>{
            setCount(c=>c+1);
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
