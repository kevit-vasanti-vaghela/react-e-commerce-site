import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import ProductItem from './ProductItem'
import classes from './ProductList.module.css'

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const productData = useLoaderData();
    
    console.log(productData)

    
    const getFilteredProducts = (searchTerm,productData) => {
        return productData.filter((product) => 
         product.item.toLowerCase().includes(searchTerm.toLowerCase()))
    }   

    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredProducts = getFilteredProducts(searchTerm,productData)
  return (
    <div className={classes.products}>
        <input type="search" onChange={onChangeHandler} value={searchTerm} placeholder='Search Products' />
        <ul className={classes.list}>
            {filteredProducts.map((product) => (
                <ProductItem key={product.id} product={product}/>
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
