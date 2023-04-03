import React from 'react'
import classes from './SignUpForm.module.css'
import { Form } from 'react-router-dom'


const SignUpForm = ({ data, showUpdating, showUpdated, showIdle,  onUpdate, cartUserData, onProceed, onCancel}) => {
  const ordered = localStorage.getItem('ordered');
  console.log('ORDERED',ordered)
  console.log('CART USR DATA',cartUserData);
  console.log(' DATA',data);
 
  return (
    <div className={classes['signup-div']}>
      <Form method={data ? 'post' : 'post'} className={classes.form}>
        <p>
          <label htmlFor="firstname">FirstName</label>
          <input 
          id="firstname" 
          type="text" 
          name="firstname" 
          defaultValue=
          {data ? 
            data[0].firstname : 
            (cartUserData ?cartUserData[0].firstname : '')} 
          required />
        </p>
        <p>
          <label htmlFor="lastname">LastName</label>
          <input 
            id="lastname" 
            type="text" 
            name="lastname"
            defaultValue=
            {data ? 
              data[0].lastname :
              (cartUserData ? cartUserData[0].lastname : '')} 
            required />
        </p>   
        {!data  && !cartUserData  ? <p>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            defaultValue=
            {data ? 
            data[0].email : 
            (cartUserData ? cartUserData[0].email : '')} required />
        </p> : ''}
        <p>
          <label htmlFor="number">Mobile Number</label>
          <input 
            id="number" 
            type="number" 
            name="mobile" 
            defaultValue=
            {data ? 
            data[0].mobile : 
            (cartUserData ? cartUserData[0].mobile : '')} required />
        </p>
        {!data  && !cartUserData  ? <p>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            required />
        </p> : ''}
        <p>
          <label htmlFor="city">City</label>
          <input 
            id="city" 
            type="text" 
            name="city" 
            defaultValue=
            {data ? 
            data[0].address.city : 
            (cartUserData ? cartUserData[0].address.city : '')} required />
        </p>
        <p>
          <label htmlFor="state">State</label>
          <input 
            id="state" 
            type="text" 
            name="state" 
            defaultValue=
            {data ? 
            data[0].address.state : 
            (cartUserData ? cartUserData[0].address.state : '')} required />
        </p>
        <p>
          <label htmlFor="country">Country</label>
          <input 
            id="country" 
            type="text" 
            name="country" 
            defaultValue=
            {data ? 
            data[0].address.country :
            (cartUserData ?cartUserData[0].address.country : '')} required />
        </p>
        <div className={classes.actions}>
          {cartUserData && <button style ={{marginRight:'310px'}} onClick={onCancel}>Cancel</button>}
          <button onClick={(!showUpdating && showIdle && !showUpdated )  ? onUpdate : (cartUserData ? onProceed : null)}>{
          data  ?
          (showUpdated ? 'UPDATING...' : 'UPDATE')
          : (cartUserData ? 'PROCEED' : 'SAVE')}</button>
        </div>
      </Form>
    </div>
  )
}

export default SignUpForm

export async function singleUserLoader() {
  
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const loggedInUserId = loggedInUser.id;

  const url = new URL('https://641adba89b82ded29d438067.mockapi.io/users');
  url.searchParams.append('id', loggedInUserId);
  const response = await fetch(url ,{
    method: 'GET',
    headers: {'content-type':'application/json'},
  })
  const responseData = await response.json();
  return responseData;
}


//Action function
export async function changeUserDataAction({ request }) {

  const data = await request.formData();
  console.log("DATA",data)
  const userData = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      mobile: data.get('mobile'),
      address:{
        city: data.get('city'),
        state: data.get('state'),
        country: data.get('country'),
      }
    };

  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const loggedInUserId = loggedInUser.id;
  console.log('ID',loggedInUserId)
  console.log('USERDATA',userData)

  const response = await fetch('https://641adba89b82ded29d438067.mockapi.io/users/' + loggedInUserId , {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:3000',
      },
      body: JSON.stringify(userData)
    })
  const responseData = await response.json();
  console.log('CHANGE-USER',responseData)
  return responseData
}


