import { create } from 'zustand';

/**
 * useAppStore — Zustand single store for the shopping cart application.
 *
 * Key Zustand advantage: components subscribe via SELECTORS, so they only
 * re-render when the exact slice of state they care about changes.
 *
 * Example:
 *   const isOpen = useAppStore(state => state.cart.isOpen);
 *   // ^ Only re-renders when isOpen changes, not on any other state update!
 */
const getInitialCart = () => {
  try {
    const saved = localStorage.getItem('bunny_cart_zustand');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem('bunny_cart_zustand', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};

const useAppStore = create((set) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  cart: {
    items: getInitialCart(),
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

  // ── Cart Actions ──────────────────────────────────────────────────────────
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.items.find(i => i.productId === product.productId);
      const items = existing
        ? state.cart.items.map(i =>
            i.productId === product.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [
            ...state.cart.items,
            {
              productId: product.productId,
              name: product.name,
              quantity: 1,
              price: product.price,
              emoji: product.emoji,
            },
          ];
      saveCart(items);
      return { cart: { ...state.cart, items } };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const items = state.cart.items.filter(i => i.productId !== productId);
      saveCart(items);
      return {
        cart: {
          ...state.cart,
          items,
        },
      };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const safeQty = Math.max(1, quantity);
      const items = state.cart.items.map(i =>
        i.productId === productId ? { ...i, quantity: safeQty } : i
      );
      saveCart(items);
      return {
        cart: {
          ...state.cart,
          items,
        },
      };
    }),

  clearCart: () =>
    set((state) => {
      saveCart([]);
      return {
        cart: {
          ...state.cart,
          items: [],
        },
      };
    }),

  toggleCart: () =>
    set((state) => ({
      cart: { ...state.cart, isOpen: !state.cart.isOpen },
    })),

  // ── User Actions ──────────────────────────────────────────────────────────
  toggleLogin: () =>
    set((state) => ({
      user: { ...state.user, isLoggedIn: !state.user.isLoggedIn },
    })),

  setUserName: (name) =>
    set((state) => ({ user: { ...state.user, name } })),

  // ── UI Actions ────────────────────────────────────────────────────────────
  setTheme: (theme) =>
    set((state) => ({ ui: { ...state.ui, theme } })),

  setNotification: (message, type = 'success') =>
    set((state) => ({ ui: { ...state.ui, notification: { message, type } } })),

  clearNotification: () =>
    set((state) => ({ ui: { ...state.ui, notification: null } })),
}));

export default useAppStore;
