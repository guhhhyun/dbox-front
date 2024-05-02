import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
// import { IS_DEV } from "constants/global-constants";
import setting from "./setting";
import session from "./session";
import doc from "./doc";

console.debug("stores/index.js");

const middlewares = [];

// 개발환경일 경우 redux logger 미들웨어 설정
// if (IS_DEV) {
//   middlewares.push(logger);
// }

const rootReducer = combineReducers({
  doc: persistReducer(
    {
      key: "doc",
      storage,
    },
    doc,
  ),
  setting: persistReducer(
    {
      key: "setting",
      storage,
    },
    setting,
  ),
  session: persistReducer(
    {
      key: "session",
      storage,
    },
    session,
  ),
});

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);

  return { store, persistor };
}
