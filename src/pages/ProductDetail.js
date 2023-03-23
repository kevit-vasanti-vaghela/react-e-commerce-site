import React from 'react'
import { useLoaderData } from 'react-router-dom';
import EachProduct from '../components/EachProduct';


const ProductDetail = () => {
  const eachProductData = useLoaderData();
  console.log('EACH LOADER DATA', eachProductData)
  return (
    <div>
     <EachProduct product={eachProductData} />
    </div>
  )
}

export default ProductDetail

export async function loadEachProduct({params}) {
  const url = new URL('https://641adba89b82ded29d438067.mockapi.io/products');
  const productId = params.id
  url.searchParams.append('id', productId);
  const response = fetch(url, {
      method: 'GET',
      headers: {'content-type':'application/json'},
  })
  console.log(response)
  return response
}
