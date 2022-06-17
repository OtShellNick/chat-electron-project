import {configureStore} from '@reduxjs/toolkit';
import userReducer from '@store/userStore/userStore';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
