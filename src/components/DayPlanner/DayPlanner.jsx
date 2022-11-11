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
        console.log(selectedTime);
        console.log(timer);


    }

    const checkTime = (id,time)=>{
        if(timer===null){
            setTimer(id);
            setSelectedTime(time);
            const selectedHour = time.substr(0,2);
            const selectedMinutes = time.substr(3,2);
            const selectedSeconds = time.substr(6,2);
            setTimerSetting([parseInt(selectedHour),parseInt(selectedMinutes),
                parseInt(selectedSeconds)]);

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
