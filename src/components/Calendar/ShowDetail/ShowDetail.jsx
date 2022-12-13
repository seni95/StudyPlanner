import React from 'react';
import ToDo from '../../ToDo/ToDo';
import styles from './ShowDetail.module.css';

export default function ShowDetail({item,date}) {
  return (
    <div className={styles.container}>
      <span>{date}</span>
      {item && 
      <ShowAnal item={item}></ShowAnal>}
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


  const returnWorks = (i)=>{

    return (
      <li>
        <div>{i.name}</div>
        <span>작업시간: {i.time}</span>
        <span>{i.status!=="active"?"완료":"미완료"}</span>
      </li>
    )
  }

  const returnComplete = (i)=>{
    let count = 0;
    for(let k=0; k<i.length; k++){
      if(i[k].status!=="active")
      {count++;}
    }
    return <div>{count}개</div>
  }

  const returnRate = (i)=>{
    let active = 0;
    let completed = 0;
    let total=0;
    for(let k=0; k<i.length; k++){
      if(i[k].status!=="active")
      {completed++;}else{active++}
      total++;
    }
    return <div>{(completed/total)*100}%</div>
  }


  return <div>
    총 집중시간: {returnWorkTime(item)}
    완료한 업무 : {returnComplete(item)}
    진행도 : {returnRate(item)}
    {console.log(item)}
    {item.map(i=>returnWorks(i))}
  </div>;

}