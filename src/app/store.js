import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todoSlice';

// creating store
export const store = configureStore({
  reducer: todosSlice.reducer,
});
