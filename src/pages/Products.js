import React from 'react'
import { useActionData } from 'react-router-dom'

const Products = () => {
  const data = useActionData();
  return (
    <div>
      <h1>Products Page</h1>
      {<h1>{data}</h1>}
    </div>
  )
}

export default Products
