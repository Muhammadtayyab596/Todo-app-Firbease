import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticate: false,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("ACCESSTOKEN");
      state.user = null;
      state.isAuthenticate = false;
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticate = true;
      state.loading = false;
    },
  },
});

export const { logoutUser, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
