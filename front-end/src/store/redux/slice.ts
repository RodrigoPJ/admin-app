import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../../types/state-types';
import reducers from './reducers';

const initialState: UserState = {
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  roles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : reducers.setUser
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
