import React, { useRef } from 'react'
import classes from './LoginForm.module.css'
import {useLoaderData, useNavigate } from 'react-router-dom'


const LoginForm = () => {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const loaderData = useLoaderData();
  let navigate = useNavigate();
  const checkLogin = (e) =>{
    e.preventDefault();
    const authData = loaderData.find(data => {
      return (data.email === enteredEmail.current.value && data.password === enteredPassword.current.value)
    })
    console.log(authData)
    if(authData) {
      localStorage.setItem('auth', true);
      localStorage.setItem('user',JSON.stringify(authData));
      return navigate('/&/products')
    }
    return navigate('/')
  }
    
  
  return (
    <div className={classes['login-div']}>
      <form onSubmit={checkLogin} className={classes.form}>
        <p>
          <label htmlFor="email">Email</label>
          <input ref={enteredEmail} id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input ref={enteredPassword} id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

export async function loader({ request }) {
 
  const response = await fetch('https://641adba89b82ded29d438067.mockapi.io/users' ,{
    method: 'GET',
    headers: {'content-type':'application/json'},
  })
  const responseData = await response.json();
  
  console.log('Response Data', responseData)
  const newData = responseData.map((data) => {
    return {email: data.email,password: data.password}
  })
  console.log('NEW DATA', newData)
  return newData
}

