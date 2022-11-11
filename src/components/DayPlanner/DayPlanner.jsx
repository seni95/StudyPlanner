//오늘 할 일을 감싸는 컴포넌트
import React, { useState } from 'react'
import StopWatch from '../StopWatch/StopWatch';
import ToDo from '../ToDo/ToDo'

export default function DayPlanner() {
    const [timer, setTimer] = useState(null);
    const [todos,setTodos] = useState([
        {name:"포트폴리오 만들기",state:"active",time:"01:00:00",repeat:"everyday",id:"jj"},
        {name:"독서",state:"active",time:"00:50:00",repeat:"everyday",id:"jjj"},{name:"윤석열" ,id:"tjrduf"}
    
    ]);

    const [selectedTime, setSelectedTime] = useState();
    const [timerSetting,setTimerSetting] = useState(null);


    const timeSetting = ()=>{
        const selected = todos.map(item=>item.id==timer?item.time:null);
        console.log(typeof(selected));
        console.log(selectedTime);
        const selectedHour = selectedTime.substr(0,2);
        const selectedMinutes = selectedTime.substr(3,2);
        const selectedSeconds = selectedTime.substr(6,2);
        console.log(selectedHour);
        console.log(selectedMinutes);
        console.log(selectedSeconds);
        setTimerSetting([selectedHour,selectedMinutes,selectedSeconds]);
    }

    const checkTime = (id,time)=>{
        if(timer===null){
            setTimer(id);
            setSelectedTime(time);
            timeSetting();
        }
        else {
            setTimer(null);
            setSelectedTime(null);
            
        }

    }

    const updateTime = (id, time) =>{
        const updated = todos.map(item=>{
            if(item.id===id){
                return {...item, time}
            } return item;
        })
        setTodos(updated);
    }
  return (
    <div>
        {todos.map(item=>(
            <ToDo todo={item} key={item.id} checkTime={checkTime}></ToDo>
        ))}
        {timer===null? null:
        <StopWatch todo={timer} updateTime={updateTime} time={timerSetting}></StopWatch>}
    </div>
  )
}
