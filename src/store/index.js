import {configureStore} from "@reduxjs/toolkit";
import reviewReducer from "./review";
import accountReducer from "./account";

const store = configureStore({
    reducer: {
        account: accountReducer,
        review: reviewReducer
    }
})

export default store