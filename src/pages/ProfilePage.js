import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import { redirect, useActionData } from 'react-router-dom'
import Modal from '../UI/Modal'
import Checkout from '../components/Checkout'

const ProfilePage = () => {
  const navigate = useNavigate();
  const updateddata = useActionData();
  const [showModal, setShowModal] = useState(false);
  console.log('UPDATED_DATA',updateddata);
  const ordered = localStorage.getItem('ordered');
  const data = useLoaderData();
  const proceedHandler = () => {
    setShowModal(true)
  }
  const modalHandler = () => {
    setShowModal(false)
    localStorage.removeItem('ordered');
    navigate('/')
  }
  const customerDetails = <h1 
                            style={{
                                textAlign:'center',
                                color:'brown'
                            }}
                          >
                            Customer Details
                          </h1> 
const customerProfile = <h1 
                          style={{
                              textAlign:'center',
                              color:'brown'
                          }}
                        >
                          Customer Profile
                        </h1> 
  return (
    <div>
       {
        showModal && 
        <Modal >
           <Checkout onClose={modalHandler}/>
        </Modal>
      }
      { ordered ? customerDetails : customerProfile }
      <SignUpForm data={data} request='post' onProceed={proceedHandler}/>
    </div>
  )
}

export default ProfilePage

//Loader function
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
  
  // if(localStorage.getItem('ordered')){
  //   localStorage.clear()
  //   return redirect('/checkout')
  // }
  // return redirect('/products')
  return responseData
}
