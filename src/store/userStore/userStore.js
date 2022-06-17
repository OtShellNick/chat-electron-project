import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => ({...state, user: action.payload}),
    logoutUser: (state) => ({...state, user: {}}),
  },
});

export const {loginUser} = userSlice.actions;
export default userSlice.reducer;
