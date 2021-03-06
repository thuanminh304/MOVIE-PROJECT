import React, { useEffect, useState } from "react";
//import firebase
// import withFirebaseAuth from "react-with-firebase-auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import BackgroundImg from "../../../assets/Auth/bg-sign.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import axios from "axios";
import Swal from "sweetalert2";
import Alert from "@material-ui/lab/Alert";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
// import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import { actLoginUser } from "containers/shared/Auth/Login/module/action";
// import {firebase} from "firebaseConfig";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  main: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(to bottom,rgba(20,50,93,.95),rgba(8,22,48,.95))",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    color: theme.palette.common.white,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bottomLink: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  closeBox: {
    position: "absolute",
    top: "-18px",
    right: "-18px",

    width: "36px",
    height: "36px",
    borderRadius: "50%",

    backgroundColor: "#081630",
    color: "#455570",
    boxShadow: "0 2px 10px 0 rgb(0 0 0 / 50%)",
    cursor: "pointer",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    transition: "all .2s",

    "&:hover": {
      opacity: ".7",
    },
  },
}));

const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInputBase-input:-webkit-autofill": {
      WebkitBackgroundClip: "text !important",
      WebkitTextFillColor: "white !important",
    },
  },
})(TextField);

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Vui l??ng nh???p t??i kho???n !"),
  matKhau: yup.string().required("Vui l??ng nh???p m???t kh???u !"),
});

function LogIn(props) {
  const history = useHistory();

  //gg login
  let ggUser={};
  const loginSuccessGG = (res) => {

    localStorage.setItem("ggUser", JSON.stringify(res.profileObj));
    if (localStorage.getItem("ggUser")) {
      ggUser = JSON.parse(localStorage.getItem("ggUser"));
    }
    console.log("gguser", ggUser);

       history.push("/");
    // dispatch(actFetchLogin(res.profileObj,histoty))
  };
  const loginFailureGG = (res) => {
    console.log("failure", res);
  };
  /////////////////////

  const classes = useStyles();

  const [loginError, setLoginError] = useState(null);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userC, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  useEffect(() => {
    if (localStorage.getItem("nhoTaiKhoan")) {
      setRemember(true);
      setUser(JSON.parse(localStorage.getItem("nhoTaiKhoan")));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({
      ...userC,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    console.log("data", data);
    setLoginError(null);
    axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap`,
      method: `POST`,
      data,
    })
      .then((result) => {
        if (remember) {
          localStorage.setItem("nhoTaiKhoan", JSON.stringify(data));
        } else {
          localStorage.removeItem("nhoTaiKhoan");
        }

        localStorage.setItem("dangNhap", JSON.stringify(result.data));
        Swal.fire({
          icon: "success",
          title: "????ng nh???p th??nh c??ng",

          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          history.replace("/");
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoginError(error.response.data);
      });
  };
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <Container className={classes.main} component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonOutlineOutlinedIcon />
          </Avatar>
          <Typography className={classes.header} component="h1" variant="h1">
            ????ng nh???p
          </Typography>
          <form
            className={classes.form}
            // onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="taiKhoan"
              label="T??i kho???n"
              name="taiKhoan"
              autoComplete="taiKhoan"
              {...register("taiKhoan")}
              error={!!errors.taiKhoan}
              helperText={errors?.taiKhoan?.message}
              value={userC.taiKhoan}
              onChange={handleChange}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              InputProps={{
                style: { color: "#fff" },
              }}
            />

            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="matKhau"
              label="M???t Kh???u"
              type={showPassword ? "text" : "password"}
              id="matKhau"
              autoComplete="matKhau"
              {...register("matKhau")}
              error={!!errors.matKhau}
              helperText={errors?.matKhau?.message}
              value={userC.matKhau}
              onChange={handleChange}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              InputProps={{
                style: { color: "#fff" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="primary"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              style={{
                color: "white",
              }}
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  style={{ color: "white" }}
                  checked={remember}
                />
              }
              label="Nh??? t??i kho???n"
              onChange={() => setRemember(!remember)}
            />

            {/* In ra loi neu dang nhap that bai */}
            {loginError ? <Alert severity="error">{loginError}</Alert> : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {
                event.preventDefault();
                onSubmit(userC);
                dispatch(actLoginUser(userC));
              }}
            >
              ????ng Nh???p
            </Button>
            {/* button login GG */}
            <GoogleLogin
              clientId="639960842870-to56prpvcbin9d23hd5r14ukh7edsgbg.apps.googleusercontent.com"
              buttonText="Sign In"
              onSuccess={loginSuccessGG}
              onFailure={loginFailureGG}
              cookiePolicy={"single_host_origin"}
              isSignedIn={false}
            />
            {/*  */}
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  to="register"
                  className={classes.bottomLink}
                  variant="body2"
                >
                  {"B???n ch??a c?? t??i kho???n ?"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Link to="/" className={classes.closeBox}>
            <CloseRoundedIcon />
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default LogIn;
