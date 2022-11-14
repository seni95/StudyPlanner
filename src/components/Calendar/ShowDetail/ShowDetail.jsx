import React from 'react'
import ToDo from '../../ToDo/ToDo'

export default function ShowDetail({item}) {
  return (
    <div>
        <ShowAnal item={item}></ShowAnal>
        {item.map(i=>
        <ToDo todo={i} key={i.id}></ToDo>)}
        <div>왜 안보임</div>
    </div>
  )
}


const ShowAnal = ({item})=>{

  const returnWorkTime = (i)=>{
    const alltimes = i.map(v=>v.time);

    const getHours = alltimes.map(v=>parseInt(v.substr(0,2)));

    const getMin = alltimes.map(v=>parseInt(v.substr(3,2)));

    const getSeconds = alltimes.map(v=>parseInt(v.substr(6,2)));

    console.log(getSeconds);
    var hour=0;
    var min=0;
    var seconds=0;
    for(let k=0; k<getHours.length; k++){
      hour +=getHours[k];
      min+=getMin[k];
      seconds +=getSeconds[k];
      console.log(getSeconds[k]);
      console.log(seconds);
    }

    console.log(hour+"시간"+min+"분"+seconds+"초");

    const totalSeconds = seconds>60?seconds%60:seconds;
    const calMin = Math.floor(seconds/60)+min;
    const totalMin = calMin>60?calMin%60:calMin;
    const totalHour = Math.floor(calMin/60)+hour;

    const totalTime =(totalHour+"시간"+totalMin+"분"+totalSeconds+"초");
  
    return <span>{totalTime}</span>
  }





  return <div>
    총 집중시간: {returnWorkTime(item)}
    완료한 업무 : 1개
    진행도 : 50%;
  </div>;

}