import React from 'react'

export default function Login({authService}) {
  
  
    const saveLoginData =(content)=>{
        // console.log(content);
        localStorage.setItem('userId',content);
    }

    const onLogin = (e)=>{
    authService.login(e.currentTarget.name)
    .then(data=>saveLoginData(data.user.uid));
    // console.log(e.currentTarget.name);

}
  
    return (
    <section>
        <h1>Login</h1>
        <ul>
            <li><button name="Google" onClick={onLogin}>Google로 로그인</button></li>
            <li><button>Google로 로그인</button></li>

        </ul>
    </section>
  )
}
