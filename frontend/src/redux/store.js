import { configureStore } from '@reduxjs/toolkit';
import wordReducer from './wordSlice';
import imgLengthReducer from './imgLengthSlice'

const store = configureStore({
  reducer: {
    setWord: wordReducer,
    imgLengthCheck: imgLengthReducer
  },
});

export default store
