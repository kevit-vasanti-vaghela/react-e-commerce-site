import React, { useState } from 'react'
import classes from './Cart.module.css'
import Card from '../UI/Card'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { cartActions } from '../store/cart-slice'
import { useNavigate, useLoaderData } from 'react-router-dom'
import Modal from '../UI/Modal'
import Checkout from './Checkout'
import SignUpForm from './SignUpForm'

const Cart = () => {
  const navigate = useNavigate();
  const cartUserData = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  console.log('FROM CART USER DATA', cartUserData)
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
      setShowForm(true)
      // localStorage.setItem('ordered', true);
      
    }
    const proceedHandler = () => {
      setShowModal(true)
      localStorage.setItem('ordered', true);
    }
    const cancelHandler = () => {
      setShowForm(false)
    }


    const emptyCart = cartItems.length === 0;
    const modalHandler = () => {
      setShowModal(false)
      setShowForm(false)
      localStorage.removeItem('ordered');
      dispatch(cartActions.clearCart())
      navigate('/')
    }

    const cartCancelHandler = () => {
      dispatch(cartActions.clearCart())
    }

    

  return (
    <>
     {
        showModal && 
        <Modal >
           <Checkout onClose={modalHandler}/>
        </Modal>
      }
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
      {!emptyCart && <h2 style={{marginLeft:'400px'}}>Total Amount : ${Amount.toFixed(2)}</h2>}
      {showButtons && !showForm ? <div className={classes.actions} >
            <button className={classes['cancel-button']} onClick={cartCancelHandler} >Cancel</button>
            <button className={classes['order-button']}  onClick={orderHandler}>Order</button>
      </div> : ''}
    </Card>
    {showForm && 
    <>
      <h1 
        style={{
          textAlign:'center',
          color:'brown'
        }}
      >
        Customer Details
      </h1> 
      <SignUpForm 
        cartUserData={cartUserData} 
        request='post' 
        onProceed={proceedHandler}
        onCancel={cancelHandler}
        autofocus
      />
    </>}
    
  
  </>)
}

export default Cart
 
