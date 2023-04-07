import React, { useRef, useState } from 'react'
import classes from './LoginForm.module.css'
import {useLoaderData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice'
import Modal from '../UI/Modal'
import modalClasses from '../UI/Modal.module.css'
import Card from '../UI/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LoginForm = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const loaderData = useLoaderData();
  
  let navigate = useNavigate();
  const checkLogin = (e) =>{
    e.preventDefault();
    dispatch(cartActions.clearCart())
    const authData = loaderData.find(data => {
      return (data.email === enteredEmail.current.value && data.password === enteredPassword.current.value)
    })
    console.log(authData)
    if(authData) {
      localStorage.setItem('auth', true);
      localStorage.setItem('user',JSON.stringify(authData));
      toast('Login Successfull!');
      setTimeout(()=> {
        return navigate('/products')
      },1000)
    } else {
      setShowModal(true)
    }
  }
   
  const modalHandler = () => {
    setShowModal(false)
  }
   
  
    
  
  return (
    <div className={classes['login-div']}>

      {
        showModal && 
        <Modal >
          <Card>
            <h2 className={modalClasses['modal-heading']}>Invalid Credentials</h2>
            <button className={modalClasses['modal-close']} onClick={modalHandler}>Close</button>
          </Card>
        </Modal>
      }
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
      <ToastContainer />

    </div>
  )
}

export default LoginForm

export async function loginLoader() {
 
  const response = await fetch('https://641adba89b82ded29d438067.mockapi.io/users' ,{
    method: 'GET',
    headers: {'content-type':'application/json'},
  })
  const responseData = await response.json();
  
  console.log('Response Data', responseData)
  const newData = responseData.map((data) => {
    return {id: data.id, email: data.email,password: data.password, firstname:data.firstname}
  })
  console.log('NEW DATA', newData)
  return newData
}

