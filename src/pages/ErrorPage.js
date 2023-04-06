import React from 'react'
import MainNavigation from '../components/MainNavigation'
import PageContent from '../UI/PageContent'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError();
  let title ='An Error Occurred !'
  let message = '';
  if(error.status === 500) {
    message = error.data.message
  }
  
  if(error.status === 404) {
    message = 'Could not find the page !'
  }
  return (
    <>
        <MainNavigation />
        <PageContent title={title} >
          <p>{message}</p>
        </PageContent>
        {/* <main style={{color:'brown', textAlign:'center'}}>
            <h1>An error occurred !</h1>
            <p>Could not find this page.</p>
        </main> */}
    </>
  )
}

export default ErrorPage
