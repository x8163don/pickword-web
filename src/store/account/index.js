import {createSlice} from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {account: null},
    reducers: {
        replaceAccountDetail: (state, action) => {
            state.account = action.payload;
        }
    }
})

export const accountActions = accountSlice.actions

export default accountSlice.reducer
