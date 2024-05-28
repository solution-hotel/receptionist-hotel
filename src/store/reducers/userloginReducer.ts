import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { UserLogin } from '@/utils/types/user';


interface UserState {
  login: UserLogin | null;
}

const initialState: UserState = {
  login: null,
};

export const userSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLogin | null>) => {
      state.login = action.payload;
    },
    logoutUser: (state) => {
      state.login = null
    }
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userlogin.login;

export default userSlice.reducer;
