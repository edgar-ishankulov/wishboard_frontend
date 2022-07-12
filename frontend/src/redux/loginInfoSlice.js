import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    email: '',
    name: '',
  }



export const loginInfoSlice = createSlice({
  name: 'loginInfo',
  initialState,
  reducers: {
    loginInfoEmail: (state, action) => {
     state.email = action.payload
    },
    loginInfoName: (state, action) => {
      state.name = action.payload
     },
   
  },
})

// Action creators are generated for each case reducer function
export const { loginInfoEmail, loginInfoName } = loginInfoSlice.actions;

export default loginInfoSlice.reducer;