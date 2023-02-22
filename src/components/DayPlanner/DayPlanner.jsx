//오늘 할 일을 감싸는 컴포넌트
import React, { useCallback, useEffect, useState } from 'react'
import StopWatch from '../StopWatch/StopWatch';
import ToDo from '../ToDo/ToDo'
import AddToDo from '../AddToDo/AddToDo';
import styles from './DayPlanner.module.css';
import { resolvePath } from 'react-router-dom';

export default function DayPlanner({plannerRepository,userInfo}) {
    const [timer, setTimer] = useState(null);
    const [todos,setTodos] = useState([]);
    const [repeatTodos, setRepeatTodos] = useState([]);

    const [selectedTime, setSelectedTime] = useState();
    const [timerSetting,setTimerSetting] = useState(null);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    const today = year+"년"+month+"월"+day+"일";


    // useEffect(()=>{
    //     localStorage.setItem('todos',JSON.stringify(todos));
    // },[todos]);


    useEffect(()=>{
     const stopSync = plannerRepository.updateData(today,todos=>{
        setTodos(todos);
     })
     
     return ()=>{stopSync()};
     
    },[userInfo])


    
    useEffect(()=>{
        const stopSync = plannerRepository.updateData(today,todos=>{
           setRepeatTodos(todos);
        })
        
        return ()=>{stopSync()};
        
       },[userInfo])


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
        if(newTodos.repeat==="everyday")
        {
        const isRepeated = [...repeatTodos,newTodos];
        setRepeatTodos(isRepeated);
        plannerRepository.createRepeatToDo(isRepeated)}
    }

    const handleDelete = (id,repeat)=>{
        const updated = todos.filter(item=>item.id!==id);
        setTodos(updated);
        plannerRepository.saveData(today,updated);
        if(repeat==="everyday"){
        const removeRepeat = repeatTodos.filter(item=>item.id!==id)
        setRepeatTodos(removeRepeat);
        plannerRepository.saveData("repeatTodos",updated);
        }
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
        <h3 className={styles.label}>일정 목록</h3>
        <div className={styles.main}>
       <div className={styles.todos}>
       {todos.map(item=>(
            <ToDo status={item.status} todo={item} key={item.id} checkTime={checkTime} handleDelete={handleDelete} checkStatus={checkStatus}></ToDo>
        ))}
       </div>
       {timer===null? null:
       <div className={styles.timer}>
        <StopWatch todo={timer} updateTime={updateTime} time={timerSetting}></StopWatch>
        </div>}
        </div>
        <h3 className={styles.label}>일정 추가</h3>
       <div className={styles.bottom}>
       <AddToDo updateTodos={updateTodos}></AddToDo>        
       </div>
    </div>
  )
}
