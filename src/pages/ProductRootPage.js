import React from 'react'
import { Outlet } from 'react-router-dom'
import ProductNavigation from '../components/ProductNavigation'

const ProductRootPage = () => {
  return (
    <>
      <ProductNavigation />
      <Outlet />
    </>
  )
}

export default ProductRootPage
