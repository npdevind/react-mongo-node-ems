import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: 0,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.user = null;
    },
    login(state, action) {
      // state e previous data and action e user data
      const user = action.payload;

      state.user = {
        id: user.id,
        username: user.username,
        token: user.token,
      };
    },
    profile(state, action) {
      const user = action.payload;
      state.user = {
        id: user.uid,
        username: user.username,
        token: user.token || localStorage.getItem("token"),
      };
    },
    //handle multiple tab , user states
    refresh(state) {
      const token = localStorage.getItem("token");
      if ((!token && state.user) || state.user?.token != token) {
        state.user = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, login, profile, refresh } = userSlice.actions;

export default userSlice.reducer;
