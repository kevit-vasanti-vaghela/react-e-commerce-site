import React, { useRef } from 'react'
import classes from './EachProduct.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector } from 'react-redux'
import ProductQuantityForm from './ProductQuantityForm'

const EachProduct = ({ product }) => {
  const enteredQuantity = useRef();
  const cartItems = useSelector((state) => state.cart.items)
  const showQuantity =  cartItems.filter((item) => product[0].id === item.id).map((item) => item.quantity).join('')
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
      {/* {showQuantity && <p style={{backgroundColor:'bisque', width:'200px',margin: '0 auto', padding:'10px'}}>Quantity added to cart : {showQuantity}</p>}
      <menu className={classes.actions}>
        <Link to=".." relative='route'>BACK</Link>
        <button onClick={() => dispatch(cartActions.addItemToCart({id: product[0].id, price: product[0].price, item: product[0].item }))}>ADD</button> 
      </menu> */}
        <ProductQuantityForm  addToCart={addToCartHandler} enteredQuantity={enteredQuantity}/>
        
    </article>
  )
}

export default EachProduct


