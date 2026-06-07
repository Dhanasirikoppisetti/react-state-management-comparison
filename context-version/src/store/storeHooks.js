/**
 * storeHooks.js — Unified hook API for both naive and optimized context modes.
 *
 * By switching CONTEXT_MODE in config.js, these hooks transparently route
 * to either the single AppContext (naive) or the split contexts (optimized).
 * All UI components import from this file, keeping them mode-agnostic.
 */
import { CONTEXT_MODE } from './config';
import { useAppContext } from './naive/AppContext';
import { useCartContext } from './optimized/CartContext';
import { useUserContext } from './optimized/UserContext';
import { useUIContext } from './optimized/UIContext';

// ── Cart hook ─────────────────────────────────────────────────────────────────
export function useCart() {
  if (CONTEXT_MODE === 'naive') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state, dispatch } = useAppContext();
    return {
      items: state.cart.items,
      isOpen: state.cart.isOpen,
      addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { product } }),
      removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } }),
      updateQuantity: (productId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }),
      toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = useCartContext();
  return {
    items: state.items,
    isOpen: state.isOpen,
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { product } }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } }),
    updateQuantity: (productId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
  };
}

// ── User hook ─────────────────────────────────────────────────────────────────
export function useUser() {
  if (CONTEXT_MODE === 'naive') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state, dispatch } = useAppContext();
    return {
      name: state.user.name,
      isLoggedIn: state.user.isLoggedIn,
      toggleLogin: () => dispatch({ type: 'TOGGLE_LOGIN' }),
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = useUserContext();
  return {
    name: state.name,
    isLoggedIn: state.isLoggedIn,
    toggleLogin: () => dispatch({ type: 'TOGGLE_LOGIN' }),
  };
}

// ── UI hook ───────────────────────────────────────────────────────────────────
export function useUI() {
  if (CONTEXT_MODE === 'naive') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state, dispatch } = useAppContext();
    return {
      theme: state.ui.theme,
      notification: state.ui.notification,
      setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
      setNotification: (msg, type = 'success') =>
        dispatch({ type: 'SET_NOTIFICATION', payload: { message: msg, type } }),
      clearNotification: () => dispatch({ type: 'CLEAR_NOTIFICATION' }),
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = useUIContext();
  return {
    theme: state.theme,
    notification: state.notification,
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    setNotification: (msg, type = 'success') =>
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: msg, type } }),
    clearNotification: () => dispatch({ type: 'CLEAR_NOTIFICATION' }),
  };
}
