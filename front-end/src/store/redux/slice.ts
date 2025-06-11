import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../../utils/types/state-types';
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
  reducers
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
