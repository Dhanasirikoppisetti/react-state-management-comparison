import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    notification: null,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setNotification(state, action) {
      // payload: { message: string, type: 'success' | 'error' | 'info' }
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { setTheme, setNotification, clearNotification } = uiSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectTheme = state => state.ui.theme;
export const selectNotification = state => state.ui.notification;

export default uiSlice.reducer;
