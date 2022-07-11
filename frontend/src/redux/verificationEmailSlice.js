import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  verificationEmail: false
}


export const verificationEmailSlice = createSlice({
  name: 'verificationEmail',
  initialState,
  reducers: {
    verificationEmail: (state, action) => {
     state.verificationEmail = action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { verificationEmail } = verificationEmailSlice.actions;

export default verificationEmailSlice.reducer;