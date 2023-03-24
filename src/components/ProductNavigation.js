import React from 'react'
import classes from './ProductNavigation.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProductNavigation = () => {
  const navigate = useNavigate();
  const cartQuantity = useSelector(state=> state.cart.totalQuantity);
  const moveToCartHandler = () => {
    navigate('cart')
  }
  return (
    <div className={classes['nav-div']}>
        <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
            <li>
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
        </ul>
    </nav>
    <nav>
        <ul className={classes.list}>
          <li>
            <button className={classes['cart-button']} onClick={moveToCartHandler}>
              <span>My Cart</span>
              <span className={classes.badge}>{cartQuantity}</span>
            </button>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Checkout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    </div>
    
  )
  
}

export default ProductNavigation
