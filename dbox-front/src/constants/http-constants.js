console.debug("http-constants.js");

// 루트 URL
export const PREFIX_URL =
  process.env.REACT_APP_PREFIX_URL || window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");

// HTTP 타임아웃
export const HTTP_TIMEOUT = process.env.REACT_APP_HTTP_TIMEOUT || 30000;
// 파일 전송 타임아웃
export const FILE_TIMEOUT = process.env.REACT_APP_FILE_TIMEOUT || 1800000;

// 상태코드
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// 토큰 키
export const TOKEN = "api_key";
