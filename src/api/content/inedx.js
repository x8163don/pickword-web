import {getAuthToken} from "../../utils/auth";

export const addVideo = async ({title, description, thumbnail, videoID, sourceURL, captions, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}content:addVideo`, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            description: description,
            thumbnail: thumbnail,
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

export const searchContent = async ({signal, orderBy, limit}) => {
    let url = `${process.env.REACT_APP_BASE_URL}content:search?`;
    let params = new URLSearchParams({order_by: orderBy, limit})
    const response = await fetch(url + params.toString(), {
        method: 'GET',
        headers: {Authorization: getAuthToken()},
        signal
    })
    return response.json()
}