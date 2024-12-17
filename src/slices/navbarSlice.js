import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  openHamProducts: false,
  navProductsDropD: false,
  searchBarOpen: false,
  searchValue: '',
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },

    closeMenu: (state) => {
      return {
        ...state, 
        isOpen: false,
        searchBarOpen: false,
        navProductsDropD: false
      };  
    },

    toggleHamProducts: (state) => {
      state.openHamProducts = !state.openHamProducts;
    },

    hoverNavProducts: (state) => {
      state.navProductsDropD = !state.navProductsDropD;
      state.searchBarOpen = false;
    },

    closeNavDropdown: (state) => {
      state.navProductsDropD = false;
      state.searchBarOpen = false;
    },

    toggleSearchBar: (state) => {
      state.searchBarOpen = !state.searchBarOpen;
      state.navProductsDropD = false;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, toggleHamProducts, hoverNavProducts, toggleSearchBar, setSearchValue, closeNavDropdown } = navbarSlice.actions;

export default navbarSlice.reducer;
