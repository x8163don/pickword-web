import {getAuthToken} from "../../utils/auth";

export const getByIDs = async ({ids, signal}) => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}words`, {
        method: 'POST',
        body: JSON.stringify({ids: ids}),
        headers: {Authorization: token},
        signal
    })
    return response.json()
}