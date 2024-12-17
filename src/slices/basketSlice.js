import { createSlice } from "@reduxjs/toolkit";


const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem("basket");
      if (serializedState === null) {
        return { products: [], quantity: 1 }; 
      }
      return JSON.parse(serializedState); // Obyekte cevir
    } 
    catch (e) {
      console.error("Could not load state from localStorage", e);
      return { products: [], quantity: 1 }; // eger yoxdursa default deyeri al
    }
  };
  

  const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("basket", serializedState);
    } 
    catch (e) {
      console.error("Could not save state to localStorage", e);
    }
  };


  const initialState = loadFromLocalStorage();

  const basketSlice = createSlice({
      name: "basket",
      initialState,
      reducers: {
          increase: (state, action) => {
              const product = state.products.find((item) => item.id === action.payload.id);
              if (product) {
                product.quantity = product.quantity < 20 ? product.quantity + 1 : product.quantity;
              }
              saveToLocalStorage(state);
          },
          decrease: (state, action) => {
              const product = state.products.find((item) => item.id === action.payload.id);
              if (product) {
                product.quantity = product.quantity > 1 ? product.quantity - 1 : product.quantity;
              }
              saveToLocalStorage(state);
          },
          addToBasket: (state, action) => {
              const existingProduct = state.products.find((item) => item.id === action.payload.id);
              if (existingProduct) {
                  existingProduct.quantity += 1;
              } else {
                  state.products.push({ ...action.payload, quantity: 1, checked: true }); 
              }
              saveToLocalStorage(state);
          },
          removeFromBasket: (state, action) => {
              state.products = state.products.filter((item) => item.id !== action.payload.id);
              saveToLocalStorage(state);
          },
          clearBasket: (state) => {
              state.products = [];
              saveToLocalStorage(state);
          },
          toggleProductCheck: (state, action) => {
              const product = state.products.find((item) => item.id === action.payload.id);
              if (product) {
                product.checked = !product.checked; 
              }
              saveToLocalStorage(state);
          },
          selectAllProducts: (state, action) => {
              const shouldCheckAll = action.payload;
              state.products.forEach((product) => {
                  product.checked = shouldCheckAll; 
              });
              saveToLocalStorage(state);
          },
          removeCheckedProducts: (state) => {
              state.products = state.products.filter((item) => !item.checked); 
              saveToLocalStorage(state);
          }
      },
  });
  
  export const {
      increase,
      decrease,
      addToBasket,
      removeFromBasket,
      clearBasket,
      toggleProductCheck,
      selectAllProducts,
      removeCheckedProducts
  } = basketSlice.actions;
  export default basketSlice.reducer;
  