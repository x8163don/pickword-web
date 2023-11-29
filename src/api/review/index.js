import axios from "axios";

export const createReview = async () => {
    const token = sessionStorage.getItem("token")
    const response = await axios.post("/review:create", {}, {
        headers: {Authorization: token},
    })
    return response.data
}

export const answerQuestion = async (reviewId, answer) => {
    const token = sessionStorage.getItem("token")
    const response = await axios.post("/review:answer", {
        review_id: reviewId,
        answer: answer
    }, {
        headers: {Authorization: token},
    })
    return response.data
}

export const getReview = async (reviewId) => {
    const token = sessionStorage.getItem("token")
    const response = await axios.get(`/review/${reviewId}`, {
        headers: {Authorization: token},
    })
    return response.data
}