import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let temp = { isChecked: '', name: '', link: '', state: {} };
const initialState = {
  allregion: [], // Initial state
  flagUrl: '',
  apiOrigin: {
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
    siteLimit: 12,
  },
  initialload: {
    highlightType: null,
    highlights: null,
    logo: null,
    subTopicID: null,
    isSubtopicVideo: null,
  },
  articlevideo: {
    highlightType: null,
    highlights: null,
    logo: null,
    subTopicID: null,
    isSubtopicVideo: null,
  },
  topicwithsubtopic: null,
};
export const countryReducer = createSlice({
  name: 'country',
  initialState,
  reducers: {
    selectCountry: (state, action) => {
       let tempState = state;
       const newObj = tempState?.allregion.find((s) => s.id == action?.payload);
       tempState.apiOrigin = newObj;
       return tempState;
    },
    setFlag: (state, action) => {
      let tempState = state;
      tempState.flagUrl = action.payload;
      return tempState;
    },
    setApiOrigin: (state, action) => {
      let tempState = state;
      tempState.apiOrigin = action.payload;
      return tempState;
    },
    setinitialload: (state, action) => {
      let tempState = state;
      tempState.initialload = action.payload;
      return tempState;
    },
    setarticlevideo: (state, action) => {
      let tempState = state;
      tempState.articlevideo = action.payload;
      return tempState;
    },
    settopiwithsubtopic: (state, action) => {
      let tempState = state;
      tempState.topicwithsubtopic = action.payload;
      return tempState;
    },
    setallregion: (state, action) => {
      let tempState = state;
      tempState.allregion = action.payload;
      return tempState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  selectCountry,
  setFlag,
  setApiOrigin,
  setinitialload,
  setarticlevideo,
  settopiwithsubtopic,
  setallregion
} = countryReducer.actions;

export default countryReducer.reducer;
