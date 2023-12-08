import {createSlice} from "@reduxjs/toolkit"

const reviewSlice = createSlice({
    name: "review",
    initialState: {review: null},
    reducers: {
        replaceReview: (state, action) => {
            const tmpReview = action.payload

            if (tmpReview.status == "Doing" && tmpReview.current_question_id === 0) {
                tmpReview.current_question_id = tmpReview.questions[0].id
            }

            state.review = tmpReview
        },
        answerQuestion: (state, action) => {
            if (!state.review) {
                return
            }

            if (state.review.status !== "Doing") {
                return
            }

            const curQuestionIdx = state.review.questions.findIndex((q) => q.id == state.review.current_question_id)

            if (!!state.review.questions[curQuestionIdx].learner_answer) {
                return
            }

            if (state.review.questions[curQuestionIdx].standard_answer === action.payload.answer) {
                state.review.questions[curQuestionIdx].is_correct = true
                state.review.questions[curQuestionIdx].learner_answer = action.payload.answer
            } else {
                state.review.questions[curQuestionIdx].learner_answer = action.payload.answer
            }

            if (curQuestionIdx == state.review.questions.length - 1) {
                state.review.status = "Answered"
                state.review.current_question_id = 0
            }
        },
        nextQuestion: (state, action) => {
            if (!state.review) {
                return
            }

            if (state.review.status !== "Doing") {
                return
            }

            if (state.review.current_question_id === state.review.questions[state.review.questions.length - 1].id) {
                return
            }

            const curQuestionIdx = state.review.questions.findIndex((q) => q.id == state.review.current_question_id)
            if (!state.review.questions[curQuestionIdx].learner_answer) {
                return
            }

            state.review.current_question_id = state.review.questions[curQuestionIdx + 1].id
        },
        resetReview: (state) => {
            state.review = null
        }
    }
})

export const reviewActions = reviewSlice.actions

export default reviewSlice.reducer