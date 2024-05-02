import { createSlice } from "@reduxjs/toolkit";

console.debug("session.js");

// 초기값 설정
const initialState = {
  user: null,
};

export const slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const setUser = slice.actions.setUser;

export default slice.reducer;
