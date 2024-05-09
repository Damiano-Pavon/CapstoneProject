 import React, { createContext, useReducer, useContext } from "react";

 const CartContext = createContext();

 const initialState = {
   cart: [],
 };
function cartReducer(state, action) {
  switch (action.type) {
    case "AGGIUNGI_AL_CARRELLO":
      const updatedCart = state.cart.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: item.quantity + 1 }  
          : item
      );
      const existingProduct = state.cart.find(item => item._id === action.payload._id);
      if (!existingProduct) {
        updatedCart.push({ ...action.payload, quantity: 1 });  
      }
      return {
        ...state,
        cart: updatedCart,
      };
      case "RIMUOVI_DAL_CARRELLO":
        const filteredCart = state.cart.filter(item => item._id !== action.payload._id); 
        return {
          ...state,
          cart: filteredCart,
        };
        case "INCREMENTA_QUANTITA":
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    case "DECREMENTA_QUANTITA":
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
      };
    default:
      return state;
  }
}


 export function CartProvider({ children }) {
   const [state, dispatch] = useReducer(cartReducer, initialState);

   return (
     <CartContext.Provider value={{ state, dispatch }}>
       {children}
     </CartContext.Provider>
   );
 }

 export function useCart() {
   return useContext(CartContext);
 }

 



