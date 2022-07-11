import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accExists: false
}


export const accExistsSlice = createSlice({
  name: 'accExists',
  initialState,
  reducers: {
    accExists: (state, action) => {
     state.accExists = action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { accExists } = accExistsSlice.actions;

export default accExistsSlice.reducer;