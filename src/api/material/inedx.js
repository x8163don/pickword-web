import {getAuthToken} from "../../utils/auth";

export const addVideoAsMaterial = async ({videoID, sourceURL, captions, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}material:addVideo`, {
        method: 'POST',
        body: JSON.stringify({
            type: 'video',
            platform: 'youtube',
            source_id: videoID,
            source_url: sourceURL,
            captions: captions,
        }),
        headers: {Authorization: getAuthToken()},
        signal
    })

    if (!response.ok) {
        throw response.error()
    }
    return response.json()
}

export const searchContent = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}material:search`, {
        method: 'GET',
        headers: {Authorization: getAuthToken()},
        signal
    })
    return response.json()
}