import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let temp = { isChecked: '', name: '', link: '', state: {} };
let tempLocal = localStorage.getItem('favouriteMenu');
const initialState = tempLocal?.length > 0 ? JSON.parse(tempLocal) : [];
export const favouriteMenuReducer = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavouriteMenu: (state, action) => {
      // console.log("action from",action?.payload);
      // state.isChecked='', state.name= '',state.link='', state.state={}
      let tempState = state;
      if (action?.payload?.isChecked) {
        tempState.push(action?.payload);
      } else {
        const newArray = tempState?.filter((s) => s.state.SubTopicId !== action?.payload?.state.SubTopicId);

        tempState = newArray;
      }
      localStorage.setItem('favouriteMenu', JSON.stringify(tempState));
      return tempState;
    },
    clearFavouriteMenu: (state, action) => {

      // localStorage.setItem('favouriteMenu', JSON.stringify([]));
      // Assuming action.payload.subTopicIds is an array of subtopic IDs to be removed
      const subTopicIdsToRemove = action?.payload || [];

      // Filter out items with subtopic IDs that are in the subTopicIdsToRemove array
      const updatedState = state.filter(
        (item) => !subTopicIdsToRemove.includes(item.state.SubTopicId)
      );

      localStorage.setItem('favouriteMenu', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavouriteMenu, clearFavouriteMenu } = favouriteMenuReducer.actions;

export default favouriteMenuReducer.reducer;
