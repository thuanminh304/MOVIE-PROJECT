import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "reducer/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const { composeWithDevTools } = require("redux-devtools-extension");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authUserReducer"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

let persistor = persistStore(store);

export { store, persistor };
