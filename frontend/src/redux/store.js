import { configureStore } from '@reduxjs/toolkit';
import wordReducer from './wordSlice';

const store = configureStore({
  reducer: {
    setWord: wordReducer,
  },
});

export default store
