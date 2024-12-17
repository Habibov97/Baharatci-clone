import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from '../slices/navbarSlice'; 
import basketReducer from '../slices/basketSlice';
import authReducer from '../slices/authSlice';


export const store = configureStore({
  reducer: {
    navbar: navbarReducer, 
    basket: basketReducer,
    auth: authReducer,
  },
});

export default store;