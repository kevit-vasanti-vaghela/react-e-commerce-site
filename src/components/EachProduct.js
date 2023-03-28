import React from 'react'
import classes from './EachProduct.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const EachProduct = ({ product }) => {
  console.log('PRODUCT',product)
  const dispatch = useDispatch();
  return (
    <article className={classes.product}>
      <Carousel>
        {product[0].images.map((image) => (
          <div key={image} className={classes['image-div']}>
            <img src={image} alt={product[0].item} />
          </div>
        ))}
      </Carousel>
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


