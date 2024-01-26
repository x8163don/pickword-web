import {getAuthToken} from "../../utils/auth";

export const searchFollowedWords = async ({page, limit = 12, text, is_mastered, signal}) => {
    const token = getAuthToken();
    const url = new URL(`${process.env.REACT_APP_BASE_URL}followedWord:search`)
    if (text) {
        url.searchParams.set("text", text)
    }
    url.searchParams.set("page", page)
    url.searchParams.set("limit", limit)
    if (is_mastered !== undefined) {
        url.searchParams.set("is_mastered", is_mastered)
    }

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

export const changeMasteredWord = async ({wordID, isMastered, signal}) => {
    const token = getAuthToken();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}learner:master_word`, {
        method: 'POST',
        headers: {Authorization: token, 'Content-Type': 'application/json'},
        body: JSON.stringify({word_id: wordID, is_mastered: isMastered}),
        signal
    })
    return response.json()
}