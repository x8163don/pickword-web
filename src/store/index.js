import {configureStore} from "@reduxjs/toolkit";
import reviewReducer from "./review";

const store = configureStore({
    reducer: {
        review: reviewReducer
    }
})

export default store