import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './login.module.css';

export default function Login({authService}) {
    const navigate = useNavigate();

  
    const saveLoginData =(content)=>{
        navigate("/studyPlanner",{state:{id:content}});
    }


    const onLogin = (e)=>{
    authService.login(e.currentTarget.name)
    .then(data=>saveLoginData(data.user.uid));
    console.log(e.currentTarget.name);

    }
    
    
    

    

    return (
    <section className={styles.container}>
        <h1>Login</h1>
        <ul>
            <li><button name="Google" onClick={onLogin}>Google로 로그인</button></li>
            <li><button>Google로 로그인</button></li>
            <form>
                
            </form>
        </ul>
    </section>
  )
}
