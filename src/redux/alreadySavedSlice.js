import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alreadySaved: false
}


export const alreadySavedSlice = createSlice({
  name: 'alreadySaved',
  initialState,
  reducers: {
    alreadySaved: (state, action) => {
     state.alreadySaved = action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { alreadySaved } = alreadySavedSlice.actions;

export default alreadySavedSlice.reducer;