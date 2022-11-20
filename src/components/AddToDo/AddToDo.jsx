import React, { useCallback, useRef, useState } from 'react';
import {IoMdCreate} from 'react-icons/io';
import styles from './AddToDo.module.css';

export default function AddToDo({updateTodos}) {

    const [repeatCycle, setRepeatCycle] = useState("none");
    const [cyclePattern,setCyclePattern] = useState("weekday");

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
            goalTime
        }

        formRef.current.reset();
        updateTodos(Todo);
        console.log(goalTime);

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

   
    const returnCycle=useCallback(()=>{
        if(repeatCycle=="everyday"|| repeatCycle=="none")
        return;

        return <>
        <select onChange={changeCyclePattern}>
            <option value="weekday">요일별</option>
            <option value="day">날짜별</option>
            <option value="period">기간별</option>
        </select>
        {returnCycleDetail()}
        </>

    },[cyclePattern]);

    const returnCycleDetail = useCallback(()=>{
        if(cyclePattern==="weekday")
        {return <select>
            <option value="mon">월</option>
            <option value="mon">화</option>
            <option value="mon">수</option>
            <option value="mon">목</option>
            <option value="mon">금</option>
            <option value="mon">토</option>
            <option value="mon">일</option>
        </select>}

        var dayArr = [];
        for(var i=0; i<31; i++)
        {
            dayArr.push(<option>매월 {i}일마다</option>)
        }

        if(cyclePattern==="day")
        {return <select>
            {dayArr}
        </select>}

        if(cyclePattern==="period")
        {return <><input type="number"></input>일마다</>
        }
    },[cyclePattern])


    const changeCyclePattern=(e)=>{
        setCyclePattern(e.target.value);
    }
    const changeRepeatCycle = (e)=>{
        setRepeatCycle(e.target.value);
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
        name="repeat" id="repeat"
        onChange={changeRepeatCycle}>
            <option value="everyday">매일</option>
            <option value="none">반복안함</option>
            <option value="setCycle">반복주기 설정</option>
        </select>
        <div id="cycleDetail">
        {returnCycle()}
        </div>
        </div>
        </div>
        <button className={styles.button}><IoMdCreate></IoMdCreate></button>
    </form>
  )
}
