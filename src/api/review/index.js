export const createReview = async () => {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review/create`, {
        method: 'POST',
        headers: {Authorization: token},
    })
    return response
}

export const answerQuestion = async (reviewId, answer) => {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review:answer`, {
        method: 'POST',
        headers: {Authorization: token},
        body: JSON.stringify({
            review_id: reviewId,
            answer: answer
        })
    })
    return response
}

export const getReview = async (reviewId) => {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review/${reviewId}`, {
        method: 'GET',
        headers: {Authorization: token},
    })
    return response
}