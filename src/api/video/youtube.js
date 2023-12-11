import {getAuthToken} from "../../utils/auth";

export const getCaptions = (async ({videoID, signal}) => {
    const token = getAuthToken()
    const usResp = await fetch(`${process.env.REACT_APP_BASE_URL}caption/${videoID}/en-US`, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })

    if (usResp.ok) {
        return usResp.json()
    }

    const ukResp = await fetch(`${process.env.REACT_APP_BASE_URL}caption/${videoID}/en-GB`, {
        method: 'GET',
        headers: {Authorization: token},
        signal
    })

    if (ukResp.ok) {
        return ukResp.json()
    }

    throw new Error("Cannot get captions")
})

