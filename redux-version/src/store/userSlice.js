import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Dhana siri',
    isLoggedIn: true,
  },
  reducers: {
    toggleLogin(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setUserName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { toggleLogin, setUserName } = userSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectUserName = state => state.user.name;
export const selectIsLoggedIn = state => state.user.isLoggedIn;

export default userSlice.reducer;
