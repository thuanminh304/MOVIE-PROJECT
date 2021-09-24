import { combineReducers } from "redux";
import { movieListReducer } from "../components/Movie/modules/reducer";
import { theaterSystemReducer } from "../components/Theater/TheaterSystem/modules/reducer";
import { theaterClusterReducer } from "../components/Theater/TheaterCluster/modules/reducer";
import { movieShowtimesReducer } from "../containers/Home/MovieChair/Purchase/modules/reducer";
export const rootReducer = combineReducers({
  movieListReducer,
  theaterSystemReducer,
  theaterClusterReducer,
  movieShowtimesReducer,
});
