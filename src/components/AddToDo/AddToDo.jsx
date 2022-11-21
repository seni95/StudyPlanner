import React, { useCallback, useRef, useState } from 'react';
import {IoMdCreate} from 'react-icons/io';
import styles from './AddToDo.module.css';

export default function AddToDo({updateTodos}) {

    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    const [today,setToday] = useState(year+"년"+month+"월"+day+"일");



    const formRef = useRef();
    const nameRef=useRef();
    const goalHourRef = useRef();
    const goalMinRef = useRef();
    const repeatRef = useRef();

    const addToDo=(e)=>{
        e.preventDefault();

        const goalHour = goalHourRef.current.value<10?"0"+goalHourRef.current.value:goalHourRef.current.value;
        const goalMin = goalMinRef.current.value<10?"0"+goalMinRef.current.value:goalMinRef.current.value;

        const goalTime = goalHour+":"+goalMin+":00";

        const Todo = {
            id:Date.now(),
            name: nameRef.current.value,
            status:'active',
            time:"00:00:00",
            repeat:repeatRef.current.value,
            goalTime,
            startDay:today
        }

        formRef.current.reset();
        updateTodos(Todo);

    }

    const createTimeSelector = ()=>{
        let hourArr = [];
        let minArr = [];

        for(let i=0; i<20; i++){
            hourArr.push(<option key={i}>{i}</option>)
        }

        for(let i=0; i<60; i++){
            minArr.push(
                <option key={i}>{i}</option>
            )
        }

        return (<>
        
        <select 
        ref={goalHourRef}
        className={styles.input}
        name="goalHour" id="goalHour">
            {hourArr}
        </select>
        <label htmlFor="goalHour">시간</label>
        <select 
        className={styles.input}
        ref={goalMinRef}
        name="goalMin" id="goalMin">
            {minArr}
        </select>
        <label htmlFor="goalMin">분</label>
        </>)
    }

   
  return (
    <form 
    ref={formRef}
    action="" onSubmit={addToDo}
    className={styles.form}
    >
        <div className={styles.inputs} id="input">
        <div>
        <label htmlFor="name">할 일</label>
        <input 
        ref={nameRef}
        type="text" id="name" name="name"
        className={styles.input}
        />
        </div>
        <div>
        <label htmlFor="goalTime">목표시간</label>
        {createTimeSelector()}
        </div>
        <div>
        <label htmlFor="repeat">반복</label>
        <select className={styles.input}
        ref={repeatRef}
        name="repeat" id="repeat">
            <option value="everyday">반복</option>
            <option value="none">반복안함</option>
        </select>
        </div>
        </div>
        <button className={styles.button}><IoMdCreate></IoMdCreate></button>
    </form>
  )
}
