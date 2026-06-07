import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import uiReducer from './uiSlice';

/**
 * Redux store configured with three slices.
 *
 * configureStore automatically:
 * - Combines the reducers
 * - Adds Redux DevTools Extension support (time-travel debugging!)
 * - Adds redux-thunk middleware for async actions
 * - Enables Immer for mutable-style reducer logic
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export default store;
