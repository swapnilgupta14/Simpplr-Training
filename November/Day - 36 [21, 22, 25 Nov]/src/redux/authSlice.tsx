import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from "../types";

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
      localStorage.setItem('userCurrent', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      console.log(state, "steate")
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('userCurrent');
      localStorage.removeItem('token');
    },
    restoreSession: (state) => {
      const storedUser = localStorage.getItem('userCurrent');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);

        if (user.token === storedToken) {
          state.user = user;
          state.isAuthenticated = true;
          state.token = storedToken;
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.token = null;
          localStorage.removeItem('userCurrent');
          localStorage.removeItem('token');
        }
      }
    }
  }
});

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;