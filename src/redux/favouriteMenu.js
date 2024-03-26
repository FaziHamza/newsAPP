import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let temp = { isChecked: '', name: '', link: '', state: {} };
let tempLocal = localStorage.getItem('favouriteMenu');
const initialState = tempLocal?.length > 0 ? JSON.parse(tempLocal) : [];
export const favouriteMenuReducer = createSlice({
  name: 'favourite',
  initialState,
  reducers: { 
    addFavouriteMenu: (state, action) => {
      
      // // console.log"action from",action?.payload);
      // state.isChecked='', state.name= '',state.link='', state.state={}
      let tempState = state;
      if (action?.payload?.isChecked) {
        // If the payload is checked, add it to the beginning of the array
        tempState.unshift(action?.payload);
        // Check if the length of tempState is greater than 6
        if (tempState.length > 100) {
          // If so, remove the last item from the array
          tempState.pop();
        }
      } else {
        // If the payload is not checked, filter out the item with the same SubTopicId
        const newArray = tempState?.filter((s) => s.state.SubTopicId !== action?.payload?.state.SubTopicId);
        tempState = newArray;
      }
      // Update localStorage with the modified tempState
      localStorage.setItem('favouriteMenu', JSON.stringify(tempState));      
      // Return the modified tempState
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
      localStorage.removeItem('FirstOpen');
      localStorage.removeItem('CurrentMenu');
      localStorage.setItem('favouriteMenu', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavouriteMenu, clearFavouriteMenu } = favouriteMenuReducer.actions;

export default favouriteMenuReducer.reducer;
