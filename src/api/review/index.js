import {getAuthToken} from "../../utils/auth";

export const createReview = async ({signal}) => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review:create`, {
        method: 'POST',
        headers: {Authorization: token},
        signal
    })
    return response
}

export const createReviewV2 = async ({signal, questionSize, createType}) => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review:create_v2`, {
        method: 'POST',
        headers: {Authorization: token},
        body: JSON.stringify({
            question_size: questionSize,
            create_type: createType
        }),
        signal
    })
    return response
}

export const answerQuestion = async ({reviewId, answer}) => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review:answer`, {
        method: 'POST',
        headers: {Authorization: token},
        body: JSON.stringify({
            review_id: reviewId,
            answer
        })
    })
    return response
}

export const cancelReview = async ({reviewId}) => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review/${reviewId}:cancel`, {
        method: 'POST',
        headers: {Authorization: token},
    })
    return response
}

export const getReview = async ({reviewId, signal}) => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review/${reviewId}`, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })
    return response.json()
}

export const getLastReview = async ({signal}) => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review:last`, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })
    return response.json()
}