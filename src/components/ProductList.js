import React, { useState,useCallback, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import ProductItem from './ProductItem'
import classes from './ProductList.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const productData = useLoaderData();
    
    
    // fetch products data
     const fetchProducts = useCallback(async() => {
        const url = new URL(`https://641adba89b82ded29d438067.mockapi.io/products?page=${activePage}&limit=5`)
        // url.searchParams.append('page', 1);
        // url.searchParams.append('limit', 10);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type':'application/json'
            }
        })
    
        const resData = await response.json();
        console.log('RESPONSE',response)
        console.log('RES DATA',resData)
        setActivePage(activePage+1);
        setProducts([...products,...resData])
     },[activePage,products])

     useEffect(() => {
        fetchProducts()
     },[])

     
    
    // console.log(productData)
    const getFilteredProducts = (searchTerm,products) => {
        return products.filter((product) => 
         product.item.toLowerCase().includes(searchTerm.toLowerCase()))
    }   

    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        },500)
    }

    const filteredProducts = getFilteredProducts(searchTerm,products)
    let showNoResult = filteredProducts.length === 0 ? true : false
  return (
    <div className={classes.products}>
        <input className={classes.searchbar} type="search" onChange={onChangeHandler} value={searchTerm} placeholder='Search Products' />
        <InfiniteScroll
            dataLength={filteredProducts.length} //This is important field to render the next data
            next={fetchProducts}
            hasMore={filteredProducts.length < productData.length}
           
        >
             {!isLoading && <ul className={classes.list}>
                {filteredProducts.map((product) => (
                     <ProductItem key={product.id} product={product}/>
                ))}
            </ul>}
            {isLoading && <p style={{textAlign:'center'}}>Loading...</p>}
            {!isLoading && showNoResult && <p style={{textAlign:'center'}}>No Result Found.</p>}
        </InfiniteScroll>
    </div>
  )
}

export default ProductList

export async function productsLoader() {
    const url = new URL('https://641adba89b82ded29d438067.mockapi.io/products');
    // url.searchParams.append('page', 1);
    // url.searchParams.append('limit', 10);
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
