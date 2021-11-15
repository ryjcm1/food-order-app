import CartContext from './cart-context'
import { useReducer } from 'react';

const defaultCartState = {
    items: [],
    amount: 0
}

const cartReducer = (state, actions) =>{

    if(actions.type === 'ADD'){
        const updatedItems = state.items.concat(actions.item);
        const updatedTotalAmount = state.totalAmount + actions.item.price * actions.item.amount
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }else if (actions.type === 'REMOVE')

    return defaultCartState
}

const CartProvider = (props) =>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item})
    
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id:id})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.amount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider