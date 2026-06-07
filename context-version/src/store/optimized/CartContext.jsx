import { createContext, useContext, useReducer } from 'react';

const initialState = {
  items: [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existing = state.items.find(i => i.productId === product.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === product.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: product.productId,
            name: product.name,
            quantity: 1,
            price: product.price,
            emoji: product.emoji,
          },
        ],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(i => i.productId !== action.payload.productId),
      };
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.productId !== productId) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      };
    }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used inside CartProvider');
  return ctx;
}
