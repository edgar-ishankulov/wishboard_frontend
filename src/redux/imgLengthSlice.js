import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  length: undefined
}


export const imgLengthSlice = createSlice({
  name: 'imgLength',
  initialState,
  reducers: {
    imgLengthCheck: (state, action) => {
     state.length = action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { imgLengthCheck } = imgLengthSlice.actions;

export default imgLengthSlice.reducer;