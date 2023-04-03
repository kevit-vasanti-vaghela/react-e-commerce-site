import React,{ useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuthToken, getSignedInUser } from '../util/auth'
import classes from './MainNavigation.module.css'
import { useSelector } from 'react-redux'


const MainNavigation = () => {
  const navigate = useNavigate();
  const [cartIconIsMoved, setCartIconIsMoved] = useState(false);
  const signedInUser = getSignedInUser()
  const cartQuantity = useSelector(state=> state.cart.totalQuantity);
  const cartItems = useSelector(state=> state.cart.items);
  const cartIconClasses = `fa-solid fa-cart-shopping ${cartIconIsMoved ? classes.bump : ''}`

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

  const auth = getAuthToken();
  const checkoutHandler = () => {
    localStorage.clear();
    navigate('/')
  }

  const moveToCartHandler = () => {
    navigate('cart')
  }

  return (
    <div className={classes['nav-div']}>
        <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
            <li className={classes['nav-items']}>
                <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
                end
                >
                Home
                </NavLink>
            </li>
            {auth && <li className={classes['nav-items']}>
                <NavLink
                to="products"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
                end
                >
                Products
                </NavLink>
            </li>}
        </ul>
    </nav>
    <nav>
        <ul className={classes.list}>
          {!auth && <li className={classes['nav-items']}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
             Login
            </NavLink>
          </li>}
          {!auth && <li className={classes['nav-items']}>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              SignUp
            </NavLink>
          </li>}
          {auth && <li className={classes['nav-items']}>
            <button className={classes['cart-button']} onClick={moveToCartHandler}>
              <i style={{fontSize:'20px'}} className={cartIconClasses}></i>
              <span className={classes.badge}>{cartQuantity}</span>
            </button>
          </li>}
          {auth && <li className={classes['nav-items']}>
            <button className={classes.checkout} onClick={checkoutHandler} >
              Checkout
            </button>
          </li>}
          {auth && <li className={classes['nav-items']}>
                <NavLink
                
                to="user-profile"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
                end
                >
                {signedInUser ? signedInUser.firstname : ''}
                <i className="fa-solid fa-user" style={{ marginLeft:'20px'}}></i>
                </NavLink>
            </li>}
        </ul>
      </nav>
    </header>
    </div>
    
  )
}

export default MainNavigation
