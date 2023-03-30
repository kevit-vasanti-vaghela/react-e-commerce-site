import React, { useRef } from 'react'
import classes from './EachProduct.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductQuantityForm from './ProductQuantityForm'

const EachProduct = ({ product }) => {
  const enteredQuantity = useRef();
  console.log('PRODUCT',product)
  const dispatch = useDispatch();


  const addToCartHandler = (e) => {
    e.preventDefault();
    const quantity = enteredQuantity.current.value;
    dispatch(cartActions.addItemToCart(
      {
        id: product[0].id, 
        price: product[0].price, 
        item: product[0].item,
        quantity: quantity
      }
      ))
  }
  return (
    <article className={classes.product}>
      <Link className={classes.back} to=".." relative='route'>
      <i class="fa-solid fa-left-long"></i> Go Back
      </Link>
      <Carousel>
        {product[0].images.map((image) => (
          <div key={image} className={classes['image-div']}>
            <img src={image} alt={product[0].item} />
          </div>
        ))}
      </Carousel>
      <h1>{product[0].item}</h1>
      <h2>${product[0].price.toFixed(2)}</h2>
      <p>{product[0].description}</p>
      <ProductQuantityForm  addToCart={addToCartHandler} enteredQuantity={enteredQuantity}/>
        
    </article>
  )
}

export default EachProduct


