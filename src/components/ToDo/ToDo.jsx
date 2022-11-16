import React, { useEffect } from 'react';
import {FcAlarmClock} from 'react-icons/fc';
import {RiDeleteBin2Line} from 'react-icons/ri';
import styles from './ToDo.module.css';

export default function ToDo({status,todo,checkTime,handleDelete,checkStatus}) {

    const showTimer = (id,time)=>{
        checkTime(id,time);
    }

    const deleteThis = (id,date)=>{
        handleDelete(id,date);
    }

    const updateStatus =(id, status)=>{
        checkStatus(id,status)
    }


  return (
    <li className={styles.todo}>
        <input type="checkbox" onChange={()=>status==="active"?updateStatus(todo.id,"completed"):updateStatus(todo.id,"active")} className={styles.checkbox} checked={status==="active"?false:true}/>
        <label htmlFor="" className={styles.text}>
            <span>{todo.name}</span>
            <span>{todo.time}</span>
            <span>목표시간 :{todo.goalTime}</span>
           <button className={styles.icon} onClick={()=>{showTimer(todo.id,todo.time)}}><FcAlarmClock></FcAlarmClock></button>
           <button className={styles.icon} onClick={()=>{deleteThis(todo.id, todo.date)}}><RiDeleteBin2Line></RiDeleteBin2Line></button>
        </label>

    </li>
    )
}
