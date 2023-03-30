import React from 'react'
import classes from './SignUpForm.module.css'
import { Form, useNavigate } from 'react-router-dom'


const SignUpForm = ({ data, onProceed }) => {
  // const navigate = useNavigate();
  // const updateddata = useActionData();
  // console.log('UPDATED_DATA',updateddata);
  const ordered = localStorage.getItem('ordered');
  console.log('ORDERED',ordered)
  
  
  // console.log('SINGLE',data[0].firstname)
  return (
    <div className={classes['signup-div']}>
      <Form method={data ? 'post' : 'post'} className={classes.form}>
        <p>
          <label htmlFor="firstname">FirstName</label>
          <input id="firstname" type="text" name="firstname" defaultValue={data ? data[0].firstname : ''} required />
        </p>
        <p>
          <label htmlFor="lastname">LastName</label>
          <input id="lastname" type="text" name="lastname" defaultValue={data ? data[0].lastname : ''} required />
        </p>   
        {!data && <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" defaultValue={data ? data[0].email : ''} required />
        </p>}
        <p>
          <label htmlFor="number">Mobile Number</label>
          <input id="number" type="number" name="mobile" defaultValue={data ? data[0].mobile : ''} required />
        </p>
        {!data && <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>}
        <p>
          <label htmlFor="city">City</label>
          <input id="city" type="text" name="city" defaultValue={data ? data[0].address.city : ''} required />
        </p>
        <p>
          <label htmlFor="state">State</label>
          <input id="state" type="text" name="state" defaultValue={data ? data[0].address.state : ''} required />
        </p>
        <p>
          <label htmlFor="country">Country</label>
          <input id="country" type="text" name="country" defaultValue={data ? data[0].address.country : ''} required />
        </p>
        <div className={classes.actions}>
          <button onClick={(data && ordered) ? onProceed : ''}>{
          data && !ordered ? 
          'CHANGE' : 
          ((data && ordered) ? 
          'PROCEED' : 'SAVE')}</button>
        </div>
      </Form>
    </div>
  )
}

export default SignUpForm

