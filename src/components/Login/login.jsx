import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './login.module.css';

export default function Login({authService}) {
    const navigate = useNavigate();

  
    const saveLoginData =(content)=>{
        window.localStorage.setItem('userInfo',JSON.stringify({id:content.uid,photo:content.photoURL,name:content.displayName,email:content.email }));
        navigate("/studyPlanner",{state:{id:content.uid,photo:content.photoURL,name:content.displayName,email:content.email }});
    }


    const onLogin = (e)=>{
    authService.login(e.currentTarget.name)
    .then(data=>saveLoginData(data.user))
    }
    

    
    

    

    return (
    <section className={styles.container}>
        <div className={styles.designLine}>
        <h1 className={styles.title}>Study/Work Planner </h1>
        <div className={styles.loginForm}>
        <ul className={styles.loginSelector}>
            <li><button className={styles.loginButton} name="Google" onClick={onLogin}>Google로 로그인</button></li>
            <li><button className={styles.loginButton}name="Github" onClick={onLogin}>Github로 로그인</button></li>
        </ul>
        <span className={styles.content}>
       시간 기록/ 일과 작성 플래너
        </span>
        </div>
        </div>
    </section>
  )
}
