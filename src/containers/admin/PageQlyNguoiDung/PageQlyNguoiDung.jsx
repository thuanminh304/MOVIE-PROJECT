import Loader from "components/Loader/Loader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchListUser } from "./modules/action";

export default function PageQlyNguoiDung(props) {
  const dispatch = useDispatch();

  const { listUser, loading } = useSelector((state) => state.userManageReducer);
  useEffect(() => {
    dispatch(actFetchListUser());
  }, []);
  console.log(listUser);

  if (loading) return <Loader />;

  return (
    listUser && (
      <div>
        acb
        {listUser.map((user) => {
          const { taiKhoan, hoTen } = user;

          return <p>{hoTen}</p>;
        })}
      </div>
    )
  );
}
