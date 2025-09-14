import { configureStore } from '@reduxjs/toolkit';

// Example slice (replace with your own slices)
import exampleReducer from './exampleSlice';

const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});

export default store;
