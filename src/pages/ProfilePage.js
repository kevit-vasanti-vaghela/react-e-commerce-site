import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import { redirect } from 'react-router-dom'

const ProfilePage = () => {
  const data = useLoaderData();
  return (
    <div>
      <h1 
        style={{
            textAlign:'center',
            color:'brown'
        }}
      >
        Customer Details
      </h1>
      <SignUpForm data={data} request='post'/>
    </div>
  )
}

export default ProfilePage

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
  localStorage.clear()
  return redirect('/checkout')
}
