import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  // Add your reducers here
});


export type RootState = ReturnType<typeof rootReducer>;
