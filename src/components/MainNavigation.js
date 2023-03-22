import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'


const MainNavigation = () => {
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
              to="/login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
             Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              SignUp
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    </div>
    
  )
}

export default MainNavigation
