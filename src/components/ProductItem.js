import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductItem.module.css'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice'
import ProductQuantityForm from './ProductQuantityForm'

const ProductItem = ({ product }) => {
  const enteredQuantity = useRef();
  const dispatch = useDispatch();
  const { item, price, id} = product;
  
  const addToCartHandler = (e) => {
    e.preventDefault();
    const quantity = enteredQuantity.current.value;
    dispatch(
      cartActions.addItemToCart({
        id,
        item,
        price,
        quantity
      })
    )
  }

 
  return (
      <li className={classes.item}>
          <Link to={product.id}>
              <img src={product.avatar} alt={product.item}/>
              <h2>{product.item}</h2>
              <p>${product.price.toFixed(2)}</p>
          </Link>
          <ProductQuantityForm enteredQuantity={enteredQuantity} addToCart={addToCartHandler}/>
      </li>
  )
}

export default ProductItem
