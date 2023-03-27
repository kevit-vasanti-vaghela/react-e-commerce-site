import React from 'react'
import { useSelector } from 'react-redux'
import Checkout from '../components/Checkout'
import Card from '../UI/Card'

const CheckoutPage = () => {
  // const cartItems = useSelector(state=> state.cart.items)
  // const items = cartItems.map((item) => {
  //   return <li style={{ listStyle:'none'}}>{item.name}</li>
  // })
  // const Amount = cartItems.map((item) => {
  //   return item.totalPrice
  // }).reduce((total,item) => {
  //   return total + item;
  // },0)
  // console.log('OREDERED',items)
  return (
    // <div 
    //   style={{ 
    //     color:'brown',
    //     margin: '10rem  auto',
    //     textAlign:'center'
    //   }}
    // >
    //   <Card 
    //     style={{
    //       maxWidth: '30rem',
    //       backgroundColor:'white',
    //       color: 'brown'
    //     }}
    //   >
    //     {/* <ul style={{ fontWeight:'600', listStyleType:'none', margin:'10px', padding:'0'}}>
    //         {items}
    //     </ul>
    //     <h2>${Amount.toFixed(2)}</h2>
    //     <h2>Order Placed</h2> */}
    //   </Card>
    // </div>
    <Checkout />
  )
}

export default CheckoutPage
