import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  word: ''
}


export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setWord: (state, action) => {
     state.word = action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setWord } = wordSlice.actions;

export default wordSlice.reducer;