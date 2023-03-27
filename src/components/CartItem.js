import React from 'react'
import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css'
import { cartActions } from '../store/cart-slice';
import { checkOrderStatus } from '../util/auth';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const { item, quantity, total, price, id } = props.item;
    const orderStatus = checkOrderStatus();
    console.log('ORDER',orderStatus)

    const addItemHandler = () => {
        dispatch(cartActions.addItemToCart({
          id,
          item,
          price,
        }))
      }
    
      const removeItemHandler = () => {
        dispatch(cartActions.removeItemFromCart(id))
      }
    
  return (
    <li className={classes.item}>
      <header>
        <h3>{item}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        {!orderStatus && <div className={classes.actions}>
          <button onClick={removeItemHandler} >-</button>
          <button onClick={addItemHandler} >+</button>
        </div>}
      </div>
    </li>
  )
  
}

export default CartItem
