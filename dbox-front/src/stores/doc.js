import { createSlice } from "@reduxjs/toolkit";
import { PAGE_KEY, SIDEBAR_TAB } from "constants/code-constants";

console.debug("doc.js");

export const TREE_TYPES = ["전체", "프로젝트/투자", "연구과제", "공유그룹"];
export const [TREE_ALL, TREE_PROJECT, TREE_RESEARCH, TREE_SHARE] = TREE_TYPES.keys();

export const PR_STATUSES = ["전체", "진행", "완료"];
export const [PR_ALL, PR_DOING, PR_DONE] = PR_STATUSES.keys();

// 초기값 설정
const initialState = {
  tab: {
    [PAGE_KEY.PRIMARY]: SIDEBAR_TAB.DEPT.key,
    [PAGE_KEY.SECONDARY]: SIDEBAR_TAB.DEPT.key,
  },
  id: {
    [PAGE_KEY.PRIMARY]: null,
    [PAGE_KEY.SECONDARY]: null,
  },
  path: {
    [PAGE_KEY.PRIMARY]: [],
    [PAGE_KEY.SECONDARY]: [],
  },
  treeType: {
    [PAGE_KEY.PRIMARY]: TREE_ALL,
    [PAGE_KEY.SECONDARY]: TREE_ALL,
  },
  prStatus: {
    [PAGE_KEY.PRIMARY]: PR_ALL,
    [PAGE_KEY.SECONDARY]: PR_ALL,
  },
  docAttr:{
    // uDocStatus:null,
  }
};

export const slice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    setTab: (state, action) => ({
      ...state,
      tab: action.payload,
    }),
    setId: (state, action) => ({
      ...state,
      id: action.payload,
    }),
    setPath: (state, action) => ({
      ...state,
      path: action.payload,
    }),
    setTreeType: (state, action) => ({
      ...state,
      treeType: action.payload,
    }),
    setPrStatus: (state, action) => ({
      ...state,
      prStatus: action.payload,
    }),
    getDocAttr: (state, action) => ({
      ...state,
      docAttr: action.payload,
    }),
    setDocAttr: (state, {payload:{key, value}}) => {
      state.docAttr[key] = value;
      return state; 
    },
  },
});

export const setTab = slice.actions.setTab;
export const setId = slice.actions.setId;
export const setPath = slice.actions.setPath;
export const setTreeType = slice.actions.setTreeType;
export const setPrStatus = slice.actions.setPrStatus;
export const getDocAttr = slice.actions.getDocAttr;
export const setDocAttr = slice.actions.setDocAttr;

export default slice.reducer;
