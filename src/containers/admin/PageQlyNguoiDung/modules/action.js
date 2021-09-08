import apisMovie from "apis/apisMovie";
import {
  FETCH_LIST_USER_FAIL,
  FETCH_LIST_USER_REQUEST,
  FETCH_LIST_USER_SUCCESS,
} from "./type";

const actFetchListUserRequest = () => ({
  type: FETCH_LIST_USER_REQUEST,
});
const actFetchListUserSuccess = (listUser) => ({
  type: FETCH_LIST_USER_SUCCESS,
  payload: listUser,
});
const actFetchListUserFail = (error) => ({
  type: FETCH_LIST_USER_FAIL,
  payload: error,
});

export const actFetchListUser = () => {
  return (dispatch) => {
    dispatch(actFetchListUserRequest());
    apisMovie
      .fetchApisMovie()
      .then((res) => {
        dispatch(actFetchListUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actFetchListUserFail(err));
      });
  };
};
