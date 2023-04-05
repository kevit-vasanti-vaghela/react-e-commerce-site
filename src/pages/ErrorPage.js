import React from 'react'
import MainNavigation from '../components/MainNavigation'

const ErrorPage = () => {
  return (
    <>
        <MainNavigation />
        <main style={{color:'brown', textAlign:'center'}}>
            <h1>An error occurred !</h1>
            <p>Could not find this page.</p>
        </main>
    </>
  )
}

export default ErrorPage
