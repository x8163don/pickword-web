import {createSlice} from "@reduxjs/toolkit"

const reviewSlice = createSlice({
    name: "review",
    initialState: {},
    reducers: {
        replaceReview: (state, action) => {
            this.state.review = action.payload
        },
        answerQuestion: (state, action) => {
            //TODO
        }
    }
})

export const reviewActions = reviewSlice.actions

export default reviewSlice.reducer