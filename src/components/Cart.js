import React from 'react'
import classes from './Cart.module.css'
import Card from '../UI/Card'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const Cart = () => {
    const cartItems = useSelector(state=> state.cart.items)
    console.log(cartItems)
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
    </Card>
  )
  
}

export default Cart
