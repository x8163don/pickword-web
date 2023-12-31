import {getAuthToken} from "../../utils/auth";

export const searchFollowedWords = async ({page, limit = 12, text, signal}) => {
    const token = getAuthToken();
    const url = new URL(`${process.env.REACT_APP_BASE_URL}followedWord:search`)
    if (text) {
        url.searchParams.set("text", text)
    }
    url.searchParams.set("page", page)
    url.searchParams.set("limit", limit)

    const response = await fetch(url, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })
    return response.json()
}

export const getLearningProgress = async ({signal}) => {
    const token = getAuthToken();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}learner:progress`, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })
    return response.json()
}