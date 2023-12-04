import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";
import reviewReducer from "./review";

const store = configureStore({
    reducer: {
        auth: authReducer,
        review: reviewReducer
    }
})

export default store