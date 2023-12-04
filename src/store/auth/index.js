import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        token: "",
        refreshToken: "",
        accountInfo: {},
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            state.refreshToken = "";
            state.accountInfo = {};
        },
        updateAccountInfo: (state, action) => {
            state.accountInfo = action.payload;
        }
    }

})

export const authActions = authSlice.actions

export default authSlice.reducer
