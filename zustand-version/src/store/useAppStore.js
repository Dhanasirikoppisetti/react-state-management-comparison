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
const useAppStore = create((set) => ({
  // ── State ──────────────────────────────────────────────────────────────────
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
      return { cart: { ...state.cart, items } };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter(i => i.productId !== productId),
      },
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cart: {
            ...state.cart,
            items: state.cart.items.filter(i => i.productId !== productId),
          },
        };
      }
      return {
        cart: {
          ...state.cart,
          items: state.cart.items.map(i =>
            i.productId === productId ? { ...i, quantity } : i
          ),
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
