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
                    ???? ?????t
                  </Typography>
                </div>
                <div className={classes.demoChairGroup}>
                  <Button
                    disabled={true}
                    className={`${classes.chair} ${classes.demoChair}`}
                  ></Button>
                  <Typography className={classes.fontResponsive}>
                    Th?????ng
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
                    C???m R???p:
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
                    ?????a ch???:
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
                    R???p:
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
                    Ng??y gi??? chi???u:
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
                    T??n Phim:
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
                    Ch???n:{" "}
                  </Typography>
                  <Typography variant="h3" className={classes.spanInfo}>
                    {movieShowtimes.bookingChairList.map((bookChair, index) => {
                      return <span>Gh??? {bookChair.stt}, </span>;
                    })}
                  </Typography>
                </div>
                <Divider variant="middle" />
                <Button
                  onClick={() => {
                    if (movieShowtimes.bookingChairList.length === 0) {
                      Swal.fire({
                        icon: "error",
                        title: "B???n ch??a ch???n gh???",
                        text: "Vui l??ng ch???n gh??? ?",
                        confirmButtonText: "???? hi???u",
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
                      title: "?????t v?? th??nh c??ng",

                      confirmButtonText: "?????ng ??",
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
                  ?????T V??
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
      title: "B???n ch??a ????ng nh???p",
      text: "B???n c?? mu???n ????ng nh???p kh??ng ?",
      confirmButtonText: "?????ng ??",
      showDenyButton: true,
      denyButtonText: "Kh??ng",
    })
      .then((result) => {
        history.push("/login");

        // if (result.isConfirmed) {
        //   history.push("/login");
        // }
      })
      .catch((err) => {
        history.push("/login");
      })
  );
}
export default Purchase;
