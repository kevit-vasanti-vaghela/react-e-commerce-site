import React from 'react'
import ProductList from '../components/ProductList'
import { getAuthToken } from '../util/auth'

const Products = () => {
  const auth = getAuthToken();
  return (
    <>
      {/* <h1 
        style={{
            textAlign:'center',
            color:'brown',
        }}
      >
        Products
      </h1> */}
      {auth && <ProductList />}
    </>
  )
}

export default Products
