import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("User logged in:", action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateProfile: (state, action) => {
      console.log("Profile updated:", action.payload);
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      console.log("User logged out");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;