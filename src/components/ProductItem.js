import React from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductItem.module.css'

const ProductItem = ({ product }) => {
  return (
    <li className={classes.item}>
        <Link to={`/&/products/${product.id}`}>
            <img src={product.avatar} alt={product.item}/>
            <h2>{product.item}</h2>
            <p>{product.price}$</p>
        </Link>
        <button>ADD</button>
    </li>
  )
}

export default ProductItem
