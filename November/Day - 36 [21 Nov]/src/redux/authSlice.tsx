import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {User, AuthState} from "../types"

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    restoreSession: (state) => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        state.user = JSON.parse(storedUser);
        state.isAuthenticated = true;
        state.token = storedToken;
      }
    }
  }
});

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;