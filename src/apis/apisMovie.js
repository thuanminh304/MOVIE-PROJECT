const { GROUP_ID } = require("settings/apiConfig");
const { default: callApiMovie } = require("utils/callApiMovie");

const apisMovie = {
  fetchApisMovie() {
    return callApiMovie(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUP_ID}`
    );
  },
};

export default apisMovie;
