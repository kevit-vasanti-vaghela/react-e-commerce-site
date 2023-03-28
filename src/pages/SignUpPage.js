import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { redirect } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div>
      <h1 
        style={{
            textAlign:'center',
            color:'brown'
        }}
      >
        Signup
      </h1>
      <SignUpForm />
    </div>
  )
}

export default SignUpPage

// Action
export async function signUpAction({ request }) {
  const data = await request.formData();
  console.log("DATA",data)
  const userData = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      mobile: data.get('mobile'),
      password: data.get('password'),
      address:{
        city: data.get('city'),
        state: data.get('state'),
        country: data.get('country'),
      }
    };
  console.log('USERDATA',userData);

    const response = await fetch('https://641adba89b82ded29d438067.mockapi.io/users' , {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    console.log('RESPONSE',response);
    localStorage.setItem('user',JSON.stringify(userData))
    // localStorage.setItem('auth', true);

    // let auth = getAuthToken();
    // if(auth) {
    //   return redirect('/&/products')
    // }

    return redirect('/login')
}

