export const createReview = async ({signal}) => {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review:create`, {
        method: 'POST',
        headers: {Authorization: token},
        signal
    })
    return response
}

export const answerQuestion = async ({reviewId, answer}) => {
    const token = sessionStorage.getItem("token")
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

export const getReview = async ({reviewId, signal}) => {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}review/${reviewId}`, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })
    return response.json()
}