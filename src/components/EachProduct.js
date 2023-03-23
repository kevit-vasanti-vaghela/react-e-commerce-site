import React from 'react'
import classes from './EachProduct.module.css'
import { Link } from 'react-router-dom'

const EachProduct = ({ product }) => {
  return (
    <article className={classes.product}>
      <img src={product[0].avatar} alt={product[0].item} />
      <h1>{product[0].item}</h1>
      <h2>{product[0].price}</h2>
      <p>{product[0].description}</p>
      <menu className={classes.actions}>
        <Link to=".." relative='route'>GO BACK</Link>
        <button>ADD</button> 
      </menu>
    </article>
  )
}

export default EachProduct


