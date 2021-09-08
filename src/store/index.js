
import userManageReducer from "containers/admin/PageQlyNguoiDung/modules/reducer";

const { combineReducers, createStore, applyMiddleware } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");
const { default: thunk } = require("redux-thunk");

const rootReducer = combineReducers({
  userManageReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
