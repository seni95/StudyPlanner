import React, { useEffect } from 'react';
import {FcAlarmClock} from 'react-icons/fc';
import {RiDeleteBin2Line} from 'react-icons/ri';
import {BsArrowRepeat} from 'react-icons/bs';
import styles from './ToDo.module.css';
import {BiStopwatch} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai';

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
            <span>{todo.name} </span>
            <span>{todo.time} </span> 
            {showCycle(todo.repeat)}
           <button className={styles.iconWrapper} onClick={()=>{showTimer(todo.id,todo.time)}}><BiStopwatch className={styles.icon}></BiStopwatch></button>
           <button className={styles.iconWrapper} onClick={()=>{deleteThis(todo.id,todo.repeat)}}><AiOutlineClose className={styles.icon}></AiOutlineClose></button>            
        </label>
        목표시간 : <span className={styles.goalTime}>{todo.goalTime}</span>
        <input type="checkbox" onChange={()=>status==="active"?updateStatus(todo.id,"completed"):updateStatus(todo.id,"active")} className={styles.checkbox} checked={status==="active"?false:true}/>
    </li>
    )
}
