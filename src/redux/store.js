import { configureStore } from "@reduxjs/toolkit";

import favouriteMenuReducer from "./favouriteMenu";
import countryReducer from './countries'
import CurrentMenu from "./CurrentMenu";

export default configureStore({
  reducer: {
    favouriteMenu: favouriteMenuReducer,
    origin: countryReducer,
    menu:CurrentMenu
  },
});
