import { createContext, useContext, useReducer } from 'react';

const initialState = {
  name: 'Dhana siri',
  isLoggedIn: true,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      return { ...state, isLoggedIn: !state.isLoggedIn };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used inside UserProvider');
  return ctx;
}
