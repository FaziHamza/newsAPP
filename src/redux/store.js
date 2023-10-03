import { configureStore } from "@reduxjs/toolkit";

import favouriteMenuReducer from "./favouriteMenu";
import countryReducer from './countries'

export default configureStore({
  reducer: {
    favouriteMenu: favouriteMenuReducer,
    origin: countryReducer
  },
});
