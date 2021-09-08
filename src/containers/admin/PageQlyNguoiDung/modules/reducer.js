import {
  FETCH_LIST_USER_FAIL,
  FETCH_LIST_USER_SUCCESS,
  FETCH_LIST_USER_REQUEST,
} from "./type";

const initialState = {
  listUser: null,
  loading: false,
  error: "",
};

const userManageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_LIST_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_LIST_USER_SUCCESS:
      return { ...state, listUser: payload, loading: false };
    case FETCH_LIST_USER_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default userManageReducer;
