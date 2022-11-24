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
        <div className={styles.designLine}>
        <h1 className={styles.title}>Study/Work <br /> Planner </h1>
        <div className={styles.loginForm}>
        <ul className={styles.loginSelector}>
            <li><button className={styles.googleLogin} name="Google" onClick={onLogin}>Google로 로그인</button></li>
            <li><button className={styles.githubLogin}name="Github" onClick={onLogin}>Github로 로그인</button></li>
        </ul>
        <span className={styles.content}>
       시간 기록/ 일과 작성 플래너
        </span>
        </div>
        </div>
    </section>
  )
}
