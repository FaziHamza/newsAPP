import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";

let temp ={isChecked:'', name: '',link:'', state:{} }
let tempLocal = localStorage.getItem('favouriteMenu')
const initialState = tempLocal?.length > 0 ? JSON.parse(tempLocal) : [];
export const favouriteMenuReducer = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFavouriteMenu: (state, action) => {
      // console.log("action from",action?.payload);
      // state.isChecked='', state.name= '',state.link='', state.state={}
      let tempState = state
      if(action?.payload?.isChecked){
        tempState.push(action?.payload)
      }
      else{
        const newArray = tempState?.filter((s) => s.name !== action?.payload?.name);

        tempState = newArray
      }
      // localStorage.setItem('favouriteMenu', JSON.stringify(tempState))
      return tempState
    },
  },

});

// Action creators are generated for each case reducer function
export const { addFavouriteMenu } = favouriteMenuReducer.actions;

export default favouriteMenuReducer.reducer;
