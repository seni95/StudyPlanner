import React, { useEffect } from 'react';
import {FcAlarmClock} from 'react-icons/fc';
import {RiDeleteBin2Line} from 'react-icons/ri';
import {BsArrowRepeat} from 'react-icons/bs';
import styles from './ToDo.module.css';

export default function ToDo({status,todo,checkTime,handleDelete,checkStatus}) {

    const showTimer = (id,time)=>{
        checkTime(id,time);
    }

    const deleteThis = (id,repeat)=>{
        handleDelete(id,repeat);
    }

    const updateStatus =(id, status)=>{
        checkStatus(id,status)
    }

    const showCycle = (cycle)=>{
        if(cycle==="everyday")
        return<span title={`${todo.repeat} 반복`}><BsArrowRepeat></BsArrowRepeat></span>;
        
    }

  return (
    <li className={styles.todo}>
        <label htmlFor="" className={styles.text}>
            <span>{todo.name}</span>
            <span>{todo.goalTime}</span>
            <span>{todo.time}</span>
           <button className={styles.icon} onClick={()=>{showTimer(todo.id,todo.time)}}><FcAlarmClock></FcAlarmClock></button>
           <button className={styles.icon} onClick={()=>{deleteThis(todo.id,todo.repeat)}}><RiDeleteBin2Line></RiDeleteBin2Line></button>
           {showCycle(todo.repeat)}
        </label>
        <input type="checkbox" onChange={()=>status==="active"?updateStatus(todo.id,"completed"):updateStatus(todo.id,"active")} className={styles.checkbox} checked={status==="active"?false:true}/>
    </li>
    )
}
