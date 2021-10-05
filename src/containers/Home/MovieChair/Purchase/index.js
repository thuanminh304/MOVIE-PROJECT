import {
  Divider,
  Grid,
  // eslint-disable-next-line no-unused-vars
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect } from "react";
import {
  actGetMovieShowtimesApi,
  actBookTicket,
  actResetBookticket,
} from "./modules/action";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";

// import Spinner from 'react-spinner-material'
import { Fragment } from "react";
// import { CURRENTUSER } from "./modules/newconstant";

import Swal from "sweetalert2";
import { useHistory } from "react-router";
import LoadingPage from "../../../../components/LoadingPage";

function Purchase(props) {
  const movieShowtimes = useSelector((state) => state.movieShowtimesReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    let showtimesID = props.match.params.maLichChieu;
    dispatch(actGetMovieShowtimesApi(showtimesID));
  }, []);
  let { currentUser } = useSelector((state) => state.authUserReducer);

  const renderMovieChair = (data) => {
    return data.danhSachGhe.map((chair, index) => {
      let indexChair = movieShowtimes.bookingChairList.findIndex(
        (choseChair) => choseChair.maGhe === chair.maGhe
      );
      let classBookedChair = chair.daDat ? classes.bookedChair : null;
      let classVipChair = chair.loaiGhe === "Vip" ? classes.vipChair : null;
      let classChoosingChair = "";
      if (indexChair !== -1) {
        classChoosingChair = "green";
        console.log(classChoosingChair, "aa");
      }
      return (
        <Fragment>
          <Button
            disabled={chair.daDat}
            className={`${classes.chair} ${classBookedChair} ${classVipChair}`}
            style={{ backgroundColor: `${classChoosingChair}` }}
            onClick={() => {
              dispatch({
                type: "CHOOSE_CHAIR",
                payload: chair,
              });
            }}
          >
            {chair.daDat ? "X" : chair.stt}
          </Button>
          {/* {(index + 1) % 16 === 0 ? renderChairRow(num) : ""} */}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  const classes = useStyles();
  let ggUser = {};
  if (localStorage.getItem("ggUser")) {
    let ggUser = JSON.parse(localStorage.getItem("ggUser"));
    currentUser = ggUser;
    currentUser.taiKhoan = ggUser.name;
  }

  return currentUser ? (
    <div className={classes.root}>
      {movieShowtimes.loading ? (
        <LoadingPage />
      ) : (
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <div className={classes.chairContainer}>
              <img
                alt=""
                style={{ width: "100%" }}
                src="https://tix.vn/app/assets/img/icons/screen.png"
              />
              <div className={classes.chairArea}>
                {movieShowtimes.data
                  ? renderMovieChair(movieShowtimes.data)
                  : null}
              </div>
              <div className={classes.demoChairContainer}>
                <div className={classes.demoChairGroup}>
                  <Button
                    disabled={true}
                    className={`${classes.chair} ${classes.bookedChair} ${classes.demoChair}`}
                  >
                    X
                  </Button>
                  <Typography className={classes.fontResponsive}>
                    Đã đặt
                  </Typography>
                </div>
                <div className={classes.demoChairGroup}>
                  <Button
                    disabled={true}
                    className={`${classes.chair} ${classes.demoChair}`}
                  ></Button>
                  <Typography className={classes.fontResponsive}>
                    Thường
                  </Typography>
                </div>
                <div className={classes.demoChairGroup}>
                  <Button
                    disabled={true}
                    className={`${classes.chair} ${classes.vipChair} ${classes.demoChair}`}
                  ></Button>

                  <Typography className={classes.fontResponsive}>
                    Vip
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          {movieShowtimes.data && (
            <Grid item xs={12} sm={12} md={4}>
              <div className={classes.datveBox}>
                <div className={classes.sectionSpacing}>
                  <Typography
                    style={{
                      color: "#8bc34a",
                      fontSize: "35px",
                      textAlign: "center",
                    }}
                  >
                    {movieShowtimes.bookingChairList.reduce(
                      (tongTien, gheDD, index) => {
                        return (tongTien += gheDD.giaVe);
                      },
                      0
                    )}{" "}
                    VND
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  className={`${classes.sectionSpacing} ${classes.flexInfo}`}
                >
                  <Typography
                    variant="h3"
                    className={classes.fontResponsiveReceipt}
                  >
                    Cụm Rạp:
                  </Typography>
                  <Typography variant="h3" className={classes.spanInfo}>
                    {movieShowtimes.data.thongTinPhim.tenCumRap}
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  className={`${classes.sectionSpacing} ${classes.flexInfo}`}
                >
                  <Typography
                    variant="h3"
                    className={classes.fontResponsiveReceipt}
                  >
                    Địa chỉ:
                  </Typography>
                  <Typography
                    variant="h3"
                    className={`${classes.spanInfo} ${classes.textElipsis}`}
                  >
                    {movieShowtimes.data.thongTinPhim.diaChi}
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  className={`${classes.sectionSpacing} ${classes.flexInfo}`}
                >
                  <Typography
                    variant="h3"
                    className={classes.fontResponsiveReceipt}
                  >
                    Rạp:
                  </Typography>
                  <Typography variant="h3" className={classes.spanInfo}>
                    {movieShowtimes.data.thongTinPhim.tenRap}
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  className={`${classes.sectionSpacing} ${classes.flexInfo}`}
                >
                  <Typography
                    variant="h3"
                    className={classes.fontResponsiveReceipt}
                  >
                    Ngày giờ chiếu:
                  </Typography>
                  <Typography variant="h3" className={classes.spanInfo}>
                    {movieShowtimes.data.thongTinPhim.ngayChieu} -{" "}
                    <span style={{ color: "red" }}>
                      {movieShowtimes.data.thongTinPhim.gioChieu}
                    </span>
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  className={`${classes.sectionSpacing} ${classes.flexInfo}`}
                >
                  <Typography
                    variant="h3"
                    className={classes.fontResponsiveReceipt}
                  >
                    Tên Phim:
                  </Typography>
                  <Typography variant="h3" className={classes.spanInfo}>
                    {movieShowtimes.data.thongTinPhim.tenPhim}
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  className={`${classes.sectionSpacing} ${classes.flexInfo}`}
                >
                  <Typography
                    variant="h3"
                    className={classes.fontResponsiveReceipt}
                  >
                    Chọn:{" "}
                  </Typography>
                  <Typography variant="h3" className={classes.spanInfo}>
                    {movieShowtimes.bookingChairList.map((bookChair, index) => {
                      return <span>Ghế {bookChair.stt}, </span>;
                    })}
                  </Typography>
                </div>
                <Divider variant="middle" />
                <Button
                  onClick={() => {
                    if (movieShowtimes.bookingChairList.length === 0) {
                      Swal.fire({
                        icon: "error",
                        title: "Bạn chưa chọn ghế",
                        text: "Vui lòng chọn ghế ?",
                        confirmButtonText: "Đã hiểu",
                      });
                      return;
                    }

                    let objectAPI = {
                      maLichChieu: props.match.params.maLichChieu,
                      danhSachVe: movieShowtimes.bookingChairList,
                      taiKhoanNguoiDung: currentUser.taiKhoan,
                    };
                    console.log("datve", objectAPI);
                    const action = actBookTicket(
                      objectAPI,
                      currentUser.accessToken
                    );
                    dispatch(action);
                    Swal.fire({
                      icon: "success",
                      title: "Đặt vé thành công",

                      confirmButtonText: "Đồng ý",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        history.push("/");
                        dispatch(
                          actGetMovieShowtimesApi(
                            props.match.params.maLichChieu
                          )
                        );
                        dispatch(actResetBookticket());
                      } else {
                        history.push("/");

                        dispatch(
                          actGetMovieShowtimesApi(
                            props.match.params.maLichChieu
                          )
                        );
                      }
                    });
                  }}
                  className={classes.buttonPurchase}
                >
                  ĐẶT VÉ
                </Button>
              </div>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  ) : (
    Swal.fire({
      icon: "error",
      title: "Bạn chưa đăng nhập",
      text: "Bạn có muốn đăng nhập không ?",
      confirmButtonText: "Đồng ý",
      showDenyButton: true,
      denyButtonText: "Không",
    }).then((result) => {
        history.push("/login");

      // if (result.isConfirmed) {
      //   history.push("/login");
      // }
    })
  );
}
export default Purchase;
