import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Card from '../UI/Card'
import classes from './Checkout.module.css'




const Checkout = (props) => {
   
  
    const cartItems = useSelector(state=> state.cart.items)
   
    const Amount = cartItems.map((item) => {
        return item.totalPrice
    }).reduce((total,item) => {
        return total + item;
    },0)
    
    console.log('CHECKOUT CART',cartItems)
   
   
    return (
        <Card  className={classes.cart}>
        <h2 style={{color:'brown', textAlign:'center'}} >You have ordered.</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className={classes.item}>
                <header>
                <h3>{item.name}</h3>
                <div className={classes.price}>
                ${item.totalPrice.toFixed(2)}{' '}
                <span className={classes.itemprice}>(${item.price.toFixed(2)}/item)</span>
                </div>
                </header>
                <div className={classes.details}>
                    <div className={classes.quantity}>
                        x <span>{item.quantity}</span>
                    </div>
                </div>
            </li>
          
          ))}
          
        </ul>
        <h2 style={{textAlign:'center'}}>Total Amount : ${Amount.toFixed(2)}</h2>
        <button  className={classes['ordered-cart-close']} onClick={props.onClose}>Close</button>
     </Card>
    )

}

export default Checkout
