import React from 'react';
import {FcAlarmClock} from 'react-icons/fc';
import {RiDeleteBin2Line} from 'react-icons/ri';
import styles from './ToDo.module.css';

export default function ToDo({todo,checkTime,handleDelete}) {

    const showTimer = (id,time)=>{
        checkTime(id,time);
    }

    const deleteThis = (id,date)=>{
        handleDelete(id,date);
    }
  return (
    <li className={styles.todo}>
        <input type="checkbox" className={styles.checkbox} />
        <label htmlFor="">
            <span>{todo.name}</span>
            <span>{todo.time}</span>
            <span>목표시간 :{todo.goalTime}</span>
           <button className={styles.icon} onClick={()=>{showTimer(todo.id,todo.time)}}><FcAlarmClock></FcAlarmClock></button>
           <button className={styles.icon} onClick={()=>{deleteThis(todo.id, todo.date)}}><RiDeleteBin2Line></RiDeleteBin2Line></button>
        </label>

    </li>
    )
}
