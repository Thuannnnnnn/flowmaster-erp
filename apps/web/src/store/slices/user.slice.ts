import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '@flowmaster/shared-types';

// Define the type for this slice's state
type UserState = {
  token: AuthResponse | null;
  isLoggedIn: boolean;
};

// Initial state
const initialState: UserState = {
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer to update user info upon successful login
    setLoginSuccess(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    // Reducer to reset state on logout
    setLogout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

// Export actions for use in components
export const { setLoginSuccess, setLogout } = userSlice.actions;

// Export the reducer to be added to the main store
export default userSlice.reducer;
