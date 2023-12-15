import {getAuthToken} from "../../utils/auth";

export const addVideo = async ({title, description, videoID, sourceURL, captions, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}content:addVideo`, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            description: description,
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
    return response.ok
}

export const searchContent = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}content:search`, {
        method: 'GET',
        headers: {Authorization: getAuthToken()},
        signal
    })
    return response.json()
}