import React from 'react'
import classes from './LoginForm.module.css'
import { Form, Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <div className={classes['login-div']}>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to='/&/products'>Login</Link>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
