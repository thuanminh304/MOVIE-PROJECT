import * as actionTypes from "./constant";
import axios from "axios";
import { TOKEN } from "./newconstant";
export const actGetMovieShowtimesApi = (showTimesID) => {
  return (dispatch) => {
    dispatch(actGetMovieShowTimesRequest());
    axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimesID}`,
      method: "GET",
    })
      .then((result) => {
        dispatch(actGetMovieShowTimesSuccess(result.data));
      })
      .catch((error) => {
        dispatch(actGetMovieShowTimesFailed(error));
      });
  };
};

const actGetMovieShowTimesRequest = () => {
  return {
    type: actionTypes.GET_MOVIE_SHOWTIMES_REQUEST,
  };
};

const actGetMovieShowTimesSuccess = (showTimes) => {
  return {
    type: actionTypes.GET_MOVIE_SHOWTIMES_SUCCESS,
    payload: showTimes,
  };
};
const actGetMovieShowTimesFailed = (error) => {
  return {
    type: actionTypes.GET_MOVIE_SHOWTIMES_FAILED,
    payload: error,
  };
};
export const actBookTicket = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        method: "POST",
        data: taiKhoan,
        headers: JSON.parse(localStorage.getItem("dangNhap")).accessToken
          ? {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("dangNhap")).accessToken
              }`,
            }
          : null,
      });

      if (result.status === 200) {
        // window.location.reload();
      }
      console.log("sucess", result.data);
    } catch (error) {
      console.log("token", localStorage.getItem(TOKEN));
      console.log("error", error.response?.data);
      console.log("err1", error);
    }
  };
};

export const actResetBookticket=()=>{
  return dispatch=>{
    dispatch({
      type:"RESET_BOOKTICKET"
    })
  }
}
