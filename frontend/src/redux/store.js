import { configureStore } from '@reduxjs/toolkit';
import wordReducer from './wordSlice';
import imgLengthReducer from './imgLengthSlice'
import alreadySavedReducer from './alreadySavedSlice';

const store = configureStore({
  reducer: {
    setWord: wordReducer,
    imgLengthCheck: imgLengthReducer,
    alreadySaved: alreadySavedReducer
  },
});

export default store
