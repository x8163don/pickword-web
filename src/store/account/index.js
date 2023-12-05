import {createSlice} from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {isExist: false, account: null},
    reducers: {
        replaceAccountDetail: (state, action) => {
            state.isExist = !!action.payload
            state.account = action.payload;
        }
    }
})

export const accountActions = accountSlice.actions

export default accountSlice.reducer
