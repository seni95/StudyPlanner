import React from 'react';
import {FcAlarmClock} from 'react-icons/fc'

export default function ToDo({todo,checkTime}) {

    const showTimer = (id,time)=>{
        checkTime(id,time);
    }
  return (
    <li>
        <input type="checkbox" />
        <label htmlFor="">
            <span>{todo.name}</span>
            <span>{todo.time}</span>
            <span>목표시간 :{todo.goalTime}</span>
           <button onClick={()=>{showTimer(todo.id,todo.time)}}><FcAlarmClock></FcAlarmClock></button>
        </label>

    </li>
    )
}
