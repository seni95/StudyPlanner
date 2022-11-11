//오늘 할 일을 감싸는 컴포넌트
import React, { useEffect, useState } from 'react'
import StopWatch from '../StopWatch/StopWatch';
import ToDo from '../ToDo/ToDo'
import AddToDo from '../AddToDo/AddToDo';

export default function DayPlanner() {
    const [timer, setTimer] = useState(null);
    const [todos,setTodos] = useState(()=>readTodos());

    const [selectedTime, setSelectedTime] = useState();
    const [timerSetting,setTimerSetting] = useState(null);


    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos));
        console.log('todos 변경');
    },[todos]);

    function readTodos(){
        const todos = localStorage.getItem('todos');
        return todos? JSON.parse(todos):[];
    }

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

    const updateTodos = (newTodos) =>{
        const updated = [...todos, newTodos];
        setTodos(updated);

    }

  return (
    <div>
        {todos.map(item=>(
            <ToDo todo={item} key={item.id} checkTime={checkTime}></ToDo>
        ))}
        {timer===null? null:
        <StopWatch todo={timer} updateTime={updateTime} time={timerSetting}></StopWatch>}
        <AddToDo updateTodos={updateTodos}></AddToDo>

    </div>
  )
}
