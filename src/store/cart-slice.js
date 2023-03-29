import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items:[],
        totalQuantity: 0,
    },
    reducers: {
        addSingleItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id) 
            state.totalQuantity++;
            if(!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.item
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id) 
            
            if(!existingItem) {
                
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price * newItem.quantity,
                    name: newItem.item
                })
                state.totalQuantity = +state.totalQuantity + +newItem.quantity;
            } else {
                if(newItem.quantity < existingItem.quantity) {

                    state.totalQuantity =  state.totalQuantity - (existingItem.quantity - newItem.quantity);
                } else {
                        state.totalQuantity = state.totalQuantity + (newItem.quantity - existingItem.quantity);
                }
                
                existingItem.quantity = newItem.quantity
                existingItem.totalPrice = newItem.quantity * newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            // state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        clearCart(state,action){
            state.items.length = 0;
            state.totalQuantity = 0;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;