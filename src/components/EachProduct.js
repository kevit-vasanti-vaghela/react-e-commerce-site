import React from 'react'
import classes from './EachProduct.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice'

const EachProduct = ({ product }) => {
  console.log('PRODUCT',product)
  const dispatch = useDispatch();
  return (
    <article className={classes.product}>
      <img src={product[0].avatar} alt={product[0].item} />
      <h1>{product[0].item}</h1>
      <h2>{product[0].price.toFixed(2)}</h2>
      <p>{product[0].description}</p>
      <menu className={classes.actions}>
        <Link to=".." relative='route'>GO BACK</Link>
        <button onClick={() => dispatch(cartActions.addItemToCart({id: product[0].id, price: product[0].price, item: product[0].item }))}>ADD</button> 
      </menu>
    </article>
  )
}

export default EachProduct


