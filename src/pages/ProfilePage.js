import React, { useState } from 'react'
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import Modal from '../UI/Modal'
import Card from '../UI/Card'
import modalClasses from '../UI/Modal.module.css'

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const showUpdating = navigation.state === 'loading'
  const showUpdated = navigation.state === 'submitting'
  const showIdle = navigation.state === 'idle'
  const ordered = localStorage.getItem('ordered');
  const data = useLoaderData();
  const updateHandler = () => {
    setShowModal(true)
    // console.log('hello')
  }
  const modalHandler = () => {
    setShowModal(false)
    navigate('/cart');
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
        showModal &&  showIdle && !showUpdated && !showUpdated &&
        <Modal >
          <Card>
            <h2 className={modalClasses['modal-heading']}>Updating Successful !</h2>
            <button className={modalClasses['modal-close']} onClick={modalHandler}>Close</button>
          </Card>
        </Modal> 
      }
      { ordered ? customerDetails : customerProfile }
      <SignUpForm 
      data={data} request='post' 
      showUpdating={showUpdating} 
      showUpdated={showUpdated}
      showIdle={showIdle}
      onUpdate={updateHandler}
      />
    </div>
  )
}

export default ProfilePage

// // Loader function
// export async function singleUserLoader() {
  
//   const loggedInUser = JSON.parse(localStorage.getItem('user'));
//   const loggedInUserId = loggedInUser.id;

//   const url = new URL('https://641adba89b82ded29d438067.mockapi.io/users');
//   url.searchParams.append('id', loggedInUserId);
//   const response = await fetch(url ,{
//     method: 'GET',
//     headers: {'content-type':'application/json'},
//   })
//   const responseData = await response.json();
//   return responseData;
// }


// //Action function
// export async function changeUserDataAction({ request }) {

//   const data = await request.formData();
//   console.log("DATA",data)
//   const userData = {
//       firstname: data.get('firstname'),
//       lastname: data.get('lastname'),
//       mobile: data.get('mobile'),
//       address:{
//         city: data.get('city'),
//         state: data.get('state'),
//         country: data.get('country'),
//       }
//     };

//   const loggedInUser = JSON.parse(localStorage.getItem('user'));
//   const loggedInUserId = loggedInUser.id;
//   console.log('ID',loggedInUserId)
//   console.log('USERDATA',userData)

//   const response = await fetch('https://641adba89b82ded29d438067.mockapi.io/users/' + loggedInUserId , {
//       method: 'PUT',
//       headers: {
//         'content-Type': 'application/json',
//         'Access-Control-Allow-Origin': 'https://localhost:3000',
//       },
//       body: JSON.stringify(userData)
//     })
//   const responseData = await response.json();
//   console.log('CHANGE-USER',responseData)
//   return responseData
// }
