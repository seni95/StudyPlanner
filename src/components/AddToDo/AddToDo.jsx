import React, { useRef } from 'react';
import {IoMdCreate} from 'react-icons/io';

export default function AddToDo({updateTodos}) {


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
            state:'active',
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
        name="goalHour" id="goalHour">
            {hourArr}
        </select>
        <label htmlFor="goalHour">시</label>
        <select 
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
    action="" onSubmit={addToDo}>
        <div>
        <label htmlFor="name">할 일</label>
        <input 
        ref={nameRef}
        type="text" id="name" name="name"/>
        </div>
        <div>
        <label htmlFor="goalTime">목표시간</label>
        {createTimeSelector()}
        </div>
        <div>
        <label htmlFor="repeat">반복</label>
        <select 
        ref={repeatRef}
        name="repeat" id="repeat">
            <option value="">매일</option>
            <option value="">반복안함</option>
        </select>
        </div>
        <button><IoMdCreate></IoMdCreate></button>
    </form>
  )
}
