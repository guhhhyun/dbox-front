import { createSlice } from "@reduxjs/toolkit";

console.debug("setting.js");

// 초기값 설정
const initialState = {
  nirisTheme: "grey",
  docPageDivided: false,
  docPageDividedHeight: window.innerHeight / 2,
  docPageDividedWidth: 240,
};

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setNirisTheme: (state, action) => ({
      ...state,
      nirisTheme: action.payload,
    }),
    setDocPageDivided: (state, action) => ({
      ...state,
      docPageDivided: action.payload,
    }),
    setDocPageDividedHeight: (state, action) => ({
      ...state,
      docPageDividedHeight: action.payload,
    }),
    setDocPageDividedWidth: (state, action) => ({
      ...state,
      docPageDividedWidth: action.payload,
    }),
  },
});

export const { setNirisTheme, setDocPageDivided, setDocPageDividedHeight, setDocPageDividedWidth } = slice.actions;

export default slice.reducer;
