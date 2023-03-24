import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import ProductItem from './ProductItem'
import classes from './ProductList.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const productData = useLoaderData();
    
    // console.log(productData)
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
        <input className={classes.searchbar} type="search" onChange={onChangeHandler} value={searchTerm} placeholder='Search Products' />
        <InfiniteScroll
            dataLength={filteredProducts.length} //This is important field to render the next data
            hasMore={true}
            loader={<h4>Loading...</h4>}
        >
            <ul className={classes.list}>
                {filteredProducts.map((product) => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </ul>
        </InfiniteScroll>
    </div>
  )
}

export default ProductList

export async function loader() {
    const url = new URL('https://641adba89b82ded29d438067.mockapi.io/products');
    url.searchParams.append('page', 1);
    url.searchParams.append('limit', 10);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type':'application/json'
        }
    })

    const resData = await response.json();
    console.log('RES DATA',resData)
    return resData
}
