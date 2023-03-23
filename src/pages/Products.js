import React from 'react'
import ProductList from '../components/ProductList'

const Products = () => {
  
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
      <div style={{
            textAlign:'center',
            color:'brown',
            marginTop:'20px'
        }}>
        <input type="search" />
      </div>
      <ProductList />
    </>
  )
}

export default Products
