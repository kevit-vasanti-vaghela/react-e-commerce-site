import React from 'react'
import classes from './ProductQuantityForm.module.css'

const ProductQuantityForm = (props) => {
  return (
    <div className={classes['quantity-form-div']}>
        <form onSubmit={props.addToCart} className={classes            ['quantity-form']}>
            <label className={classes['quantity-form-label']} htmlFor="quantity">Qty:</label>
            <input ref={props.enteredQuantity} className={classes['quantity-form-input']} type="number" id="quantity" name="quantity" min="1" max="5" />
            <button className={classes['add-button']}>ADD</button>
        </form>
    </div>
  )
}

export default ProductQuantityForm
