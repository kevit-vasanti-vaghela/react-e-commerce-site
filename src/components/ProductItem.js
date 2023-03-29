import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductItem.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../store/cart-slice'

const ProductItem = ({ product }) => {
  const enteredQuantity = useRef();
  const cartItems = useSelector((state) => state.cart.items)
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
          {/* {showQuantity ? <div 
            style={{color:'white'}}
            className={classes['product-quantity']}> 
            {
                cartItems.filter((item) => 
                        product.id === item.id)
                        .map((item) => item.quantity)
              }
          </div> : ''} */}
          <div>
          <form onSubmit={addToCartHandler} className={classes['quantity-form']}>
            <label className={classes['quantity-form-label']} for="quantity">Qty:</label>
            <input ref={enteredQuantity} className={classes['quantity-form-input']} type="number" id="quantity" name="quantity" min="1" max="5" />
            <button className={classes['add-button']}>ADD</button>
          </form>
          </div>
          
          {/* <button 
          className={classes['add-remove-button']} 
          onClick={removeItemFromCartHandler}
          disabled={!showQuantity}
          >
            REMOVE
          </button>  */}
      </li>
    </>
    
  )
}

export default ProductItem
