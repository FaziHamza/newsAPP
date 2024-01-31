import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('CurrentMenu')) || null;

export const CurrentMenuReducer = createSlice({
  name: 'CurrentMenu',
  initialState,
  reducers: {
    addCurrentMenu: (state, action) => {
      const updatedState = [action.payload];
      localStorage.setItem('CurrentMenu', JSON.stringify(updatedState));
      return updatedState;
    },    
    clearCurrentMenu: (state, action) => {
      localStorage.removeItem('CurrentMenu');
      return null;
    },
  },
});

export const { addCurrentMenu, clearCurrentMenu } = CurrentMenuReducer.actions;

export default CurrentMenuReducer.reducer;
