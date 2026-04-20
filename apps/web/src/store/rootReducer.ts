import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';

export const rootReducer = combineReducers({
  user: userReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
