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

    }
    
    
    

    

    return (
    <section className={styles.container}>
        <h1 className={styles.title}>스터디 플래너</h1>
        <div className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Login</h1>
        <ul>
            <li><button name="Google" onClick={onLogin}>Google로 로그인</button></li>
            <li><button name="Github" onClick={onLogin}>Github로 로그인</button></li>
        </ul>
        </div>
    </section>
  )
}
