import React from 'react'
import classes from './SignUpForm.module.css'
import { Form } from 'react-router-dom'


const SignUpForm = () => {
  return (
    <div className={classes['signup-div']}>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="firstname">FirstName</label>
          <input id="firstname" type="text" name="firstname" required />
        </p>
        <p>
          <label htmlFor="lastname">LastName</label>
          <input id="lastname" type="text" name="lastname" required />
        </p>   
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="number">Mobile Number</label>
          <input id="number" type="number" name="mobile" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button>Save</button>
        </div>
      </Form>
    </div>
  )
}

export default SignUpForm

