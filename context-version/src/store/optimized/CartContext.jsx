import { createContext, useContext, useReducer, useEffect } from 'react';

// ── LocalStorage Helper ──────────────────────────────────────────────────────
const getInitialCart = () => {
  try {
    const saved = localStorage.getItem('bunny_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  items: getInitialCart(),
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
      const safeQty = Math.max(1, quantity);
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === productId ? { ...i, quantity: safeQty } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem('bunny_cart', JSON.stringify(state.items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [state.items]);

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
