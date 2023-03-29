import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductItem.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../store/cart-slice'

const ProductItem = ({ product }) => {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch();
  const { item, price, id} = product;
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        item,
        price,
      })
    )
  }

  const removeItemFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }

  const showQuantity =  cartItems.filter((item) => product.id === item.id)
                                .map((item) => item.quantity).join('')
  console.log(showQuantity)
  return (
    <>
      {/* {showAddedItem && <p>{product.item} is Added</p>} */}
      <li className={classes.item}>
          <Link to={`/products/${product.id}`}>
              <img src={product.avatar} alt={product.item}/>
              <h2>{product.item}</h2>
              <p>${product.price.toFixed(2)}</p>
          </Link>
          {showQuantity ? <div 
            style={{color:'white'}}
            className={classes['product-quantity']}> 
            {
                cartItems.filter((item) => 
                        product.id === item.id)
                        .map((item) => item.quantity)
              }
          </div> : ''}
          <button className={classes['add-remove-button']} onClick={addToCartHandler}>ADD</button>
          <button 
          className={classes['add-remove-button']} 
          onClick={removeItemFromCartHandler}
          disabled={!showQuantity}
          >
            REMOVE
          </button> 
      </li>
    </>
    
  )
}

export default ProductItem
