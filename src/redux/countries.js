import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let temp = { isChecked: '', name: '', link: '', state: {} };
let tempLocal = localStorage.getItem('favouriteMenu');
 const initialState = {
  origin: [
    { id: 1, name: 'england', baseUrl: 'https://siteofsports.com/v2/' },
    { id: 2, name: 'france', baseUrl: 'https://www.sportspotfrance.dev/frenchbackend/v2/' },
  ],
  selectedOrigin: {id:0, name:'default', baseUrl:'https://siteofsports.com/v2/'},
  flagUrl: '',
  apiOrigin:{
    id: null,
    domainName: null,
    desc: null,
    nonSQLDBName: null,
    hostName: null,
    settingsUrl: null,
    baseUrl: null,
    baseUrlApi: null,
    siteLang: null,
    siteKeyword: null,
    siteLimit: 12
  },
  initialload:{
    highlightType:null,
    highlights:null,
    logo:null,
    subTopicID:null,
    isSubtopicVideo:null
  }
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
      let tempState = state;
      tempState.flagUrl = action.payload;
      return tempState;
    },
    setApiOrigin:(state, action)=>{
      let tempState = state;
      tempState.apiOrigin = action.payload;
      return tempState;
    },
    setinitialload:(state, action)=>{
      let tempState = state;
      tempState.initialload = action.payload;
      return tempState;
    }
  },
});

// Action creators are generated for each case reducer function
export const { selectCountry, setFlag , setApiOrigin,setinitialload} = countryReducer.actions;

export default countryReducer.reducer;
