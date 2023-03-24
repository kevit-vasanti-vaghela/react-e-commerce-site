import React from 'react'
import classes from './ProductNavigation.module.css'
import { NavLink } from 'react-router-dom'

const ProductNavigation = () => {
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
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
             Cart
            </NavLink>
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
