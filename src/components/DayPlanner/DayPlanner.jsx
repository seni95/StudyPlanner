//오늘 할 일을 감싸는 컴포넌트
import React, { useEffect, useState } from 'react'
import StopWatch from '../StopWatch/StopWatch';
import ToDo from '../ToDo/ToDo'
import AddToDo from '../AddToDo/AddToDo';
import styles from './DayPlanner.module.css';

export default function DayPlanner({plannerRepository}) {
    const [timer, setTimer] = useState(null);
    const [todos,setTodos] = useState([]);

    const [selectedTime, setSelectedTime] = useState();
    const [timerSetting,setTimerSetting] = useState(null);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    const today = year+"년"+month+"월"+day+"일";

    // useEffect(()=>{
    //     localStorage.setItem('todos',JSON.stringify(todos));
    //     console.log('todos 변경');
    // },[todos]);



    useEffect(()=>{
        console.log("업데이트중");

        const stopSync = plannerRepository.updateData(today, todos=>{
            setTodos(todos);
        })

        return ()=>{
            stopSync();
        }


    },[])


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
        plannerRepository.saveData(today,updated);
    }

    const updateTodos = (newTodos) =>{
        const updated = [...todos, newTodos];
        setTodos(updated);
        plannerRepository.saveData(today,updated);
    }

    const handleDelete = (id)=>{
        const updated = todos.filter(item=>item.id!==id);
        setTodos(updated);
        plannerRepository.saveData(today,updated);

    }

    const checkStatus = (id,status)=>{
        const updated = todos.map(item=>{
            if(item.id===id){
                return {...item, status}
            } return item;
        })
        setTodos(updated);
        plannerRepository.saveData(today,updated);
    }

  return (
    <div className={styles.container}>
       <div className={styles.todos}>
       {todos.map(item=>(
            <ToDo status={item.status} todo={item} key={item.id} checkTime={checkTime} handleDelete={handleDelete} checkStatus={checkStatus}></ToDo>
        ))}
       </div>
        {timer===null? null:
        <StopWatch todo={timer} updateTime={updateTime} time={timerSetting}></StopWatch>}
        <AddToDo updateTodos={updateTodos}></AddToDo>

    </div>
  )
}
