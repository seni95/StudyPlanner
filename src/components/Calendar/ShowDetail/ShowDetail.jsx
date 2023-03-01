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
  
    return <span>{totalTime}</span>
  }


  const returnWorks = (i,index)=>{

    return (
      <li key={index}>
        <div>{i.name}</div>
        <span>총 작업시간: {i.time}</span>
        <span className={styles.status}>{i.status!=="active"?"완료":"미완료"}</span>
      </li>
    )
  }

  const returnComplete = (i)=>{
    let count = 0;
    for(let k=0; k<i.length; k++){
      if(i[k].status!=="active")
      {count++;}
    }
    return <span>{count}개</span>
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
    return <span>{(completed/total)*100}%</span>
  }


  return <div>
    <div>총 집중시간: {returnWorkTime(item)}</div>
    <div>완료한 업무 : {returnComplete(item)}</div>
    <div>진행도 : {returnRate(item)}</div>
     
    <ul className={styles.items}>
      업무 리스트
    {item.map((i,index)=>returnWorks(i,index))}
    </ul>
  </div>;

}