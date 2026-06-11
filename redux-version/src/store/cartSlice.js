import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem('bunny_cart_redux');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getInitialCart(),
    isOpen: false,
  },
  reducers: {
    addItemToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(i => i.productId === product.productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          productId: product.productId,
          name: product.name,
          quantity: 1,
          price: product.price,
          emoji: product.emoji,
        });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.productId !== action.payload);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const safeQty = Math.max(1, quantity);
      const item = state.items.find(i => i.productId === productId);
      if (item) item.quantity = safeQty;
    },

    clearCart(state) {
      state.items = [];
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    openCart(state) {
      state.isOpen = true;
    },

    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const {
  addItemToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
// Use stable primitive selectors to prevent unnecessary re-renders
export const selectCartItems = state => state.cart.items;
export const selectCartIsOpen = state => state.cart.isOpen;
export const selectCartItemCount = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
