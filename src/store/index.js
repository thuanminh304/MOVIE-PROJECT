import authUserReducer from "containers/shared/Auth/Login/module/reducer";
import movieEditReducer from "containers/admin/Movie/module/reducer";
import allUserReducer from "containers/admin/User/module/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const { combineReducers, createStore, applyMiddleware } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");
const { default: thunk } = require("redux-thunk");

const rootReducer = combineReducers({
  authUserReducer,
  allUserReducer,
  movieEditReducer
});
const persistConfig = {
  key: "root",
  storage,
  whitelist:["authUserReducer"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store);

export { store, persistor };
