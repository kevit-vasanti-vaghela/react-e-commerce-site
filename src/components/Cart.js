import React from 'react'
import classes from './Cart.module.css'
import Card from '../UI/Card'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import { cartActions } from '../store/cart-slice'

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
      navigate('/products/user-profile')
    }
  return (
    <Card className={classes.cart}>
      <h2 style={{color:'brown'}}>Your Shopping Cart</h2>
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
      <h2 style={{marginLeft:'400px'}}>Total Amount : ${Amount.toFixed(2)}</h2>
      {showButtons && <div className={classes.actions} >
            <button onClick={() =>dispatch(cartActions.clearCart())} >Cancel</button>
            <button style={{marginLeft: '435px'}} onClick={orderHandler}>Order</button>
      </div>}
    </Card>
  )
  
}

export default Cart
 

