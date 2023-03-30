import React, { useState, useEffect } from 'react'
import classes from './ProductNavigation.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getSignedInUser } from '../util/auth'
const ProductNavigation = () => {
  const [cartIconisMoved, setCartIconIsMoved] = useState(false);
  const cartIconClasses = `fa-solid fa-cart-shopping ${cartIconisMoved ? classes.bump : ''}`
  const signedInUser = getSignedInUser()
  const navigate = useNavigate();
  const cartQuantity = useSelector(state=> state.cart.totalQuantity);
  const cartItems = useSelector(state=> state.cart.items);

  useEffect(() => {
    if(cartItems.length === 0 ){
      return
    }
    setCartIconIsMoved(true)
    const timer = setTimeout(() => {
      setCartIconIsMoved(false)
    },300)

    return () => {
      clearTimeout(timer)
    }
  },[cartItems])


  const moveToCartHandler = () => {
    navigate('cart')
  }

  const checkoutHandler = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className={classes['nav-div']}>
        <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
            <li>
                <NavLink
                to="/products"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
                end
                >
                Products
                </NavLink>
            </li>
        </ul>
    </nav>
    <nav>
        <ul className={classes.list}>
          <li className={classes.item}>
            <button className={classes['cart-button']} onClick={moveToCartHandler}>
              <i style={{fontSize:'20px'}} className={cartIconClasses}></i>
              <span className={classes.badge}>{cartQuantity}</span>
            </button>
          </li>
          <li className={classes.item}>
            <button className={classes.checkout} onClick={checkoutHandler} >
              Checkout
            </button>
          </li>
          <li className={classes.item}>
                <NavLink
                
                to="/products/user-profile"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
                end
                >
                {signedInUser ? signedInUser.firstname : ''}
                <i className="fa-solid fa-user" style={{ marginLeft:'20px'}}></i>
                </NavLink>
            </li>
        </ul>
      </nav>
    </header>
    </div>
    
  )
  
}

export default ProductNavigation
