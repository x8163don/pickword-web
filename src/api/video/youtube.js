import {getAuthToken} from "../../utils/auth";

export const getVideoDetail = (async ({videoID, signal}) => {
    const token = getAuthToken()
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}yt-video/${videoID}`, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })

    if (resp.ok) {
        return resp.json()
    } else {
        throw new Error("Cannot get captions")
    }
})

