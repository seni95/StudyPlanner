//오늘 할 일을 감싸는 컴포넌트
import React, { useState } from 'react'
import ToDo from '../ToDo/ToDo'

export default function DayPlanner() {
    const [todos,setTodos] = useState([
        {name:"포트폴리오 만들기",state:"active",time:"1:00:00",repeat:"everyday"},
        {name:"독서",state:"active",time:"0:00:00",repeat:"everyday"}
    
    ]);
  return (
    <div>
        {todos.map(item=>(
            <ToDo todo={item}></ToDo>
        ))}
    </div>
  )
}
