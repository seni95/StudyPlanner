import React from 'react';
import {FcAlarmClock} from 'react-icons/fc'

export default function ToDo({todo}) {
  return (
    <li>
        <input type="checkbox" />
        <label htmlFor="">
            <span>{todo.name}</span>
            <span>{todo.time}</span>
           <button><FcAlarmClock></FcAlarmClock></button>
        </label>

    </li>
    )
}
