import {getAuthToken} from "../../utils/auth";

export const searchFollowedWords = async ({page, limit = 9, text, signal}) => {
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