import AdminHome from "containers/admin/AdminHome/AdminHome";
import PageQlyNguoiDung from "containers/admin/PageQlyNguoiDung/PageQlyNguoiDung";

const adminRoutes = [
  {
    path: "/",
    component: AdminHome,
    exact: true,
  },
  {
    path: "/qlnd",
    component: PageQlyNguoiDung,
    exact: false,
  },
];

export default adminRoutes;
