import { configureStore } from "@reduxjs/toolkit";

import favouriteMenuReducer from "./favouriteMenu";

export default configureStore({
  reducer: {
    favouriteMenu: favouriteMenuReducer,
  },
});
