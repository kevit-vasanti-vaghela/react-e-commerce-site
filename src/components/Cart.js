import React from 'react'
import classes from './Cart.module.css'
import Card from '../UI/Card'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const Cart = () => {
    const cartItems = useSelector(state=> state.cart.items)
    const Amount = cartItems.map((item) => {
        return item.totalPrice
    }).reduce((total,item) => {
        return total + item;
    },0)

    const showButtons = Amount > 0 ? true : false;
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
      <h2 style={{marginLeft:'400px'}}>Total Amount : ${Amount.toFixed(2)}</h2>
      {showButtons && <div className={classes.actions} >
            <button  >Cancel</button>
            <button style={{marginLeft: '460px'}}>Order</button>
      </div>}
    </Card>
  )
  
}

export default Cart
