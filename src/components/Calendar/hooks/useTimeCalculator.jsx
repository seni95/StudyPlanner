import { useEffect, useState } from "react";

export default function useTimeCalculator(item){



    const returnWorkTime = (i)=>{
        const alltimes = i.map(v=>v.time);
    
        const getHours = alltimes.map(v=>parseInt(v.substr(0,2)));
    
        const getMin = alltimes.map(v=>parseInt(v.substr(3,2)));
    
        const getSeconds = alltimes.map(v=>parseInt(v.substr(6,2)));
    
        var hour=0;
        var min=0;
        var seconds=0;
        for(let k=0; k<getHours.length; k++){
          hour +=getHours[k];
          min+=getMin[k];
          seconds +=getSeconds[k];
        }
    
    
        const totalSeconds = seconds>60?seconds%60:seconds;
        const calMin = Math.floor(seconds/60)+min;
        const totalMin = calMin>60?calMin%60:calMin;
        const totalHour = Math.floor(calMin/60)+hour;
    
        const totalTime =(totalHour+"시간"+totalMin+"분"+totalSeconds+"초");
      
        return totalTime
      }

      const [total, setTotal] = useState(returnWorkTime(item));


      return {total}

}