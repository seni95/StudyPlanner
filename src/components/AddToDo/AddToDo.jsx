import React from 'react'

export default function AddToDo() {
  return (
    <form action="">
        <label htmlFor="">할 일</label>
        <input type="text" />
        <label htmlFor="">목표시간</label>
        <input type="text" />
        <label htmlFor="">반복</label>
        <select name="" id="">
            <option value="">매일</option>
            <option value="">반복안함</option>
        </select>
    </form>
  )
}
