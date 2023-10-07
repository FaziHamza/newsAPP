import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let temp = { isChecked: '', name: '', link: '', state: {} };
let tempLocal = localStorage.getItem('favouriteMenu');
 const initialState = {
  origin: [
    { id: 1, name: 'england', baseUrl: 'https://siteofsports.com/v2/' },
    { id: 2, name: 'france', baseUrl: 'https://www.sportspotfrance.dev/v4/' },
    { id: 3, name: 'serbia', baseUrl: 'https://www.sportspotserbia.dev/v4/' },

  ],
  selectedOrigin: {id:0, name:'default', baseUrl:'https://siteofsports.com/v2/'},
  flagUrl: ''
};
export const countryReducer = createSlice({
  name: 'country',
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      // state.isChecked='', state.name= '',state.link='', state.state={}
      let tempState = state;

      const newObj = tempState?.origin?.find((s) => s.id == action?.payload);

      tempState.selectedOrigin = newObj;

      // localStorage.setItem('favouriteMenu', JSON.stringify(tempState))
      return tempState;
    },
    setFlag:(state, action)=>{
      let tempState = state
      tempState.flagUrl = action.payload
      return tempState
    }
  },
});

// Action creators are generated for each case reducer function
export const { selectCountry, setFlag } = countryReducer.actions;

export default countryReducer.reducer;
