import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let temp = { isChecked: '', name: '', link: '', state: {} };
let tempLocal = localStorage.getItem('selectedOrigin')
const initialOrigin = tempLocal?.length > 0 ? JSON.parse(tempLocal) : {id:1, name:'england', baseUrl:'https://sportspotengland.dev/v4/',  siteLang: 'en',
siteKeyword: 'ENG',
siteLimit: 12,};
 const initialState = {
  origin: [
    { id: 1, name: 'england', baseUrl: 'https://sportspotengland.dev/v4/',  siteLang: 'en',
    siteKeyword: 'ENG',
    siteLimit: 12, },
    { id: 2, name: 'serbia', baseUrl: 'https://www.sportspotserbia.dev/v4/',  siteLang: 'sr',
    siteKeyword: 'ESP',
    siteLimit: 12, },
    { id: 3, name: 'swedish', baseUrl: 'https://sportatsite.com/v4/',  siteLang: 'sv',
    siteKeyword: 'ENG',
    siteLimit: 12, },
    { id: 4, name: 'spain', baseUrl: 'https://sportspotspain.dev/frenchbackend/v2/',  siteLang: 'es',
    siteKeyword: 'ENG',
    siteLimit: 12, },
    { id: 5, name: 'germany', baseUrl: 'https://sportspotgermany.dev/v4/',  siteLang: 'gr',
    siteKeyword: 'BL',
    siteLimit: 12, },
    { id: 6, name: 'france', baseUrl: 'https://sportspotfrance.dev/v4/',  siteLang: 'fr',
    siteKeyword: 'ENG',
    siteLimit: 12, },

  ],
  selectedOrigin: initialOrigin,
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

      localStorage.setItem('selectedOrigin', JSON.stringify(newObj))
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
