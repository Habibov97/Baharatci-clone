import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    username: '',
    token: null,
    coupon: '',
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userCredentials: (state, action) => {
            state.username = action.payload
        },

        userToken: (state, action) => {
            state.token = action.payload
        },

        userCoupon: (state, action) => {
            state.coupon = action.payload
        },
        userLogout: (state) => {
            state.username = '';
            state.token = null; // Tokeni sifirla
            state.coupon = '';
        }
    },
});


export const { userCredentials, userToken, userCoupon, userLogout  } = authSlice.actions;
export default authSlice.reducer