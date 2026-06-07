import { createContext, useContext, useReducer } from 'react';

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState = {
  cart: {
    items: [],
    isOpen: false,
  },
  user: {
    name: 'Dhana siri',
    isLoggedIn: true,
  },
  ui: {
    theme: 'light',
    notification: null,
  },
};

// ── Reducer ──────────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existing = state.cart.items.find(i => i.productId === product.productId);
      const items = existing
        ? state.cart.items.map(i =>
            i.productId === product.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [
            ...state.cart.items,
            { productId: product.productId, name: product.name, quantity: 1, price: product.price, emoji: product.emoji },
          ];
      return { ...state, cart: { ...state.cart, items } };
    }
    case 'REMOVE_FROM_CART': {
      const items = state.cart.items.filter(i => i.productId !== action.payload.productId);
      return { ...state, cart: { ...state.cart, items } };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        const items = state.cart.items.filter(i => i.productId !== productId);
        return { ...state, cart: { ...state.cart, items } };
      }
      const items = state.cart.items.map(i =>
        i.productId === productId ? { ...i, quantity } : i
      );
      return { ...state, cart: { ...state.cart, items } };
    }
    case 'TOGGLE_CART':
      return { ...state, cart: { ...state.cart, isOpen: !state.cart.isOpen } };
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        user: { ...state.user, isLoggedIn: !state.user.isLoggedIn },
      };
    case 'SET_THEME':
      return { ...state, ui: { ...state.ui, theme: action.payload } };
    case 'SET_NOTIFICATION':
      return { ...state, ui: { ...state.ui, notification: action.payload } };
    case 'CLEAR_NOTIFICATION':
      return { ...state, ui: { ...state.ui, notification: null } };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}
