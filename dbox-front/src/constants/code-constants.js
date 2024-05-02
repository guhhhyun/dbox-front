console.debug("code-constants.js");

export const DCTM_BLANK = " ";

export const TREE_KEY_DIVIDER = "_";

export const PAGE_KEY = {
  PRIMARY: "pri",
  SECONDARY: "sec",
};

export const SIDEBAR_TAB = {
  DEPT: { key: "DEPT", desc: "부서", index: 0 },
  ORG: { key: "ORG", desc: "조직", index: 1 },
};

export const TREE_TYPE = {
  DEPT: { key: "DEPT", desc: "부서" },
  CATEGORY: { key: "CATEGORY", desc: "카테고리" },
  DATA: { key: "DATA", desc: "데이터" },
};

export const CATEGORY_FOLDER = {
  DEPT: { key: "DPC", desc: "부서함" },
  PROJECT: { key: "PJT", desc: "프로젝트/투자" },
  RESEARCH: { key: "RSC", desc: "연구과제" },
  SHARE: { key: "SHR", desc: "공유/협업" },
  TAKEOUT: { key: "EXP", desc: "반출함" },
  TRASH: { key: "RCY", desc: "휴지통" },
};

export const DEPT_FOLDER = {
  APPROVAL: { key: "DWF", desc: "전자결재" },
};

export const PROJECT_FOLDER = {
  MAIN: { key: "POW", desc: "주관" },
  JOIN: { key: "PIN", desc: "참여" },
};

export const PROJECT_MAIN_FOLDER = {
  FINISHED: { key: "PFN", desc: "완료함" },
};

export const PROJECT_JOIN_FOLDER = {
  FINISHED: { key: "PIF", desc: "완료함" },
};

export const RESEARCH_FOLDER = {
  MAIN: { key: "ROW", desc: "주관" },
  JOIN: { key: "RIN", desc: "참여" },
};

export const RESEARCH_MAIN_FOLDER = {
  FINISHED: { key: "RFN", desc: "완료함" },
};

export const RESEARCH_JOIN_FOLDER = {
  FINISHED: { key: "RIF", desc: "완료함" },
};

export const DATA_TYPE = {
  DOCUMENT: { key: "D", desc: "문서" },
  FOLDER: { key: "F", desc: "폴더" },
  PROJECT: { key: "P", desc: "프로젝트/투자" },
  RESEARCH: { key: "R", desc: "연구과제" },
};

export const ICON_TYPE = {
  DOCUMENT: { key: "DOCUMENT", desc: "문서" },
  FOLDER: { key: "FOLDER", desc: "폴더" },
  TRASH: { key: "TRASH", desc: "휴지통" },
  EXCEL: { key: "EXCEL", desc: "엑셀", exts: ["xls", "xlsx"] },
  PPT: { key: "PPT", desc: "파워포인트", exts: ["ppt", "pptx"] },
  WORD: { key: "WORD", desc: "워드", exts: ["doc", "docx"] },
};

export const ICON_STATUS = {
  NORMAL: { key: "NORMAL", desc: "일반" },
  LOCK: { key: "LOCK", desc: "잠금" },
  INCOMING: { key: "INCOMING", desc: "공유받음" },
  OUTGOING: { key: "OUTGOING", desc: "공유해줌" },
};

export const HAM_TYPE = {
  PROJECT: { key: "P", desc: "프로젝트/투자" },
  RESEARCH: { key: "R", desc: "연구과제" },
  DEPT: { key: "D", desc: "부서" },
  FOLDER: { key: "F", desc: "폴더" },
};

export const OWN_JOIN = {
  OWN: "O",
  JOIN: "J",
};

export const LIMIT_VALUE_TYPE = {
  REG: { key: "REG", desc: "PC자료 등록" },
  COPY: { key: "COPY", desc: "복사" },
  DEL: { key: "DEL", desc: "삭제" },
  TRANS: { key: "TRANS", desc: "이관" },
  SIZE: { key: "SIZE", desc: "용량" },
  MOVE: { key: "MOVE", desc: "이동" },
};

export const GRID_SORT = {
  ASC: "asc",
  DESC: "desc",
  NO_SORT: null,
};

export const SEC_LEVEL = {
  SEC: { key: "S", desc: "제한" },
  TEAM: { key: "T", desc: "팀내" },
  COMPANY: { key: "C", desc: "사내" },
  GROUP: { key: "G", desc: "그룹사내" },
};

export const COM_CODE = {
  DKG: { key: "DKG", desc: "동국제강그룹" },
  DKS: { key: "DKS", desc: "동국제강" },
  ITG: { key: "ITG", desc: "인터지스" },
  UNC: { key: "UNC", desc: "동국시스템즈" },
  FEI: { key: "FEI", desc: "페럼인프라" },
};

export const ORG_TREE_TYPE = {
  USER: "U",
  DEPT: "D",
};

export const COLUMN_MODE = {
  DEFAULT: "D",
  PROJECT: "P",
  RESEARCH: "R",
  TAKEOUT: "T",
  TRASH: "R",
};

export const DOC_STATUS = {
  LIVE: { key: "L", desc: "Live" },
  CLOSED: { key: "C", desc: "Closed" },
};

export const FOL_STATUS = {
  ORDINARY: { key: "O", desc: "일반" },
  LOCK: { key: "C", desc: "잠금" },
};

export const PERMIT_TYPE = {
  BROWSE: { key: "B", level: 2, desc: "조회" },
  READ: { key: "R", level: 3, desc: "조회/다운로드" },
  DELETE: { key: "D", level: 7, desc: "조회/다운로드/편집/삭제" },
};

export const AGREEMENT_STR = "법적책임은 본인";

export const EXPORT_TYP_1 = {
  1: "회계검사",
  2: "내부통제회계",
  3: "내부관리회계 프로젝트 공유",
  0: "해당없음",
};

export const EXPORT_TYP_2 = {
  1: "거래명세서",
  2: "세금계산서",
  3: "첨부없는 메일 송부",
  0: "해당없음",
};

export const CLIPBOARD_TYPE = {
  COPY: "C",
  MOVE: "M",
  TRANSFER: "T",
  DELETE: "D",
};
