import React from 'react'
import { useLoaderData } from 'react-router-dom'
import ProductItem from './ProductItem'
import classes from './ProductList.module.css'

const ProductList = () => {
    const productData = useLoaderData();
    console.log(productData)
  return (
    <div className={classes.products}>
        <ul className={classes.list}>
            {productData.map((product) => (
                <ProductItem product={product}/>
            ))}
        </ul>
  
        </div>
  )
}

export default ProductList

export async function loader() {
    const response = await fetch('https://641adba89b82ded29d438067.mockapi.io/products', {
        method: 'GET',
        headers: {
            'content-type':'application/json'
        }
    })

    const resData = await response.json();
    console.log('RES DATA',resData)
    return resData
}
