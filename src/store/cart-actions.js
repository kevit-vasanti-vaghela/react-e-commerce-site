import { uiActions } from "./ui-slice"
import { cartActions } from "./cart-slice"

//Action creator
export const fetchCartData = () => {
    return async (dispatch) => {    //thunk
        const fetchData = async () => {
            const response = await fetch ('https://react-e-commerce-site-af1e7-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch cart data!')
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }))
        } catch (error) {
            dispatch (
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Something went wrong!'
                })
            )
        }
    }
}

// Action creator
 export const sendCartData = (cart) => {
    return (dispatch) => {    //thunk function
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async() => {
            const response = await fetch('https://react-e-commerce-site-af1e7-default-rtdb.firebaseio.com/cart.json',{
                method: 'PUT',
                body: JSON.stringify(cart)
                }
            )

            if(!response.ok) {
                throw new Error('Sending cart data failed')
            }

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Item added to cart successfully!',
            }))
        }

        sendRequest().catch((error) => {
            dispatch (
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Something went wrong!'
                })
            )
        })

    }
}