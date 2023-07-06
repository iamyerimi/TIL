import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    // 리덕스에서 자동으로 제공하는 현재 상태를 인자로 받음(state로 받)
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
