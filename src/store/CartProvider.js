import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, actions) => {
  if (actions.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + actions.item.price * actions.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === actions.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + actions.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(actions.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (actions.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === actions.id
      );

      const exisitngItem = state.items[existingCartItemIndex]
      const updatedTotalAmount = state.totalAmount - exisitngItem.price

      let updatedItems;

      if(exisitngItem.amount === 1){
        updatedItems = state.items.filter(item => item.id !== actions.id)
      }else{
        let updatedItem = {...exisitngItem, amount: exisitngItem.amount -1}
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
