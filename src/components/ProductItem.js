import React from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductItem.module.css'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice'

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { item, price, id } = product;
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        item,
        price,
      })
    )
  }
  return (
    <li className={classes.item}>
        <Link to={`/products/${product.id}`}>
            <img src={product.avatar} alt={product.item}/>
            <h2>{product.item}</h2>
            <p>${product.price.toFixed(2)}</p>
        </Link>
        <button className={classes.actions} onClick={addToCartHandler}>ADD</button>
    </li>
  )
}

export default ProductItem
