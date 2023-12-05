import {createSlice} from "@reduxjs/toolkit"

const reviewSlice = createSlice({
    name: "review",
    initialState: {review: null},
    reducers: {
        replaceReview: (state, action) => {
            state.review = action.payload
        },
        answerQuestion: (state, action) => {
            if (!state.review) {
                return
            }

            if (state.review.state === "Doing" && state.review.current_question_id === 0) {
                state.review.current_question_id = state.review.questions.first.id
            }

            const curQuestionIdx = state.review.questions.findIndex((q) => q.id == state.review.current_question_id)

            if (state.questions[curQuestionIdx].standard_answer === action.payload.answer) {
                state.review.questions[curQuestionIdx].is_correct = true
            }

            if (curQuestionIdx == state.review.questions.length - 1) {
                state.review.state = "Answered"
                state.review.current_question_id = 0
            }else{
                state.review.current_question_id = state.review.questions[curQuestionIdx + 1].id
            }
        }
    }
})

export const reviewActions = reviewSlice.actions

export default reviewSlice.reducer