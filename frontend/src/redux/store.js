import { configureStore } from '@reduxjs/toolkit';
import wordReducer from './wordSlice';
import imgLengthReducer from './imgLengthSlice'
import alreadySavedReducer from './alreadySavedSlice';
import verificationEmailReducer from './verificationEmailSlice';
import accExistsReducer from './accExistsSlice';

const store = configureStore({
  reducer: {
    setWord: wordReducer,
    imgLengthCheck: imgLengthReducer,
    alreadySaved: alreadySavedReducer,
    verificationEmail: verificationEmailReducer,
    accExists: accExistsReducer
  },
});

export default store
