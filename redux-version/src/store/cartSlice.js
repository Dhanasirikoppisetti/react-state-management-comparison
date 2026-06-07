import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    /**
     * addItemToCart — adds a product or increments quantity.
     * Immer (built into RTK) lets us "mutate" the draft state safely.
     */
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
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.productId !== productId);
        return;
      }
      const item = state.items.find(i => i.productId === productId);
      if (item) item.quantity = quantity;
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
