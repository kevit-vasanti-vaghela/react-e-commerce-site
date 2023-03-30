import React from 'react'
import classes from './Cart.module.css'
import Card from '../UI/Card'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { cartActions } from '../store/cart-slice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state=> state.cart.items)
    const Amount = cartItems.map((item) => {
        return item.totalPrice
    }).reduce((total,item) => {
        return total + item;
    },0)

    const showButtons = Amount > 0 ? true : false;
    console.log(cartItems)
    const orderHandler = () => {
      localStorage.setItem('ordered', true);
      navigate('/user-profile')
    }

    const emptyCart = cartItems.length === 0;

  return (
    <Card className={classes.cart}>
      {emptyCart && <h2 style={{color:'brown', marginLeft:'250px'}}>Cart is Empty.</h2>}
      {!emptyCart && <h2 style={{color:'brown'}}>Your Shopping Cart</h2>}
      <ul>
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={{ 
              id: item.id,
              item: item.name, 
              quantity: item.quantity, 
              total: item.totalPrice, 
              price: item.price
            }}
          />
        ))}
        
      </ul>
      {!emptyCart && <h2 style={{marginLeft:'420px'}}>Total Amount : ${Amount.toFixed(2)}</h2>}
      {showButtons && <div className={classes.actions} >
            <button className={classes['cancel-button']} onClick={() =>dispatch(cartActions.clearCart())} >Cancel</button>
            <button className={classes['order-button']}  onClick={orderHandler}>Order</button>
      </div>}
    </Card>
  )
  
}

export default Cart
 

