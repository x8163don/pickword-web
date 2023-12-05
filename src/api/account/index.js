import {getAuthToken, getRefreshToken} from "../../utils/auth";

export const login = async (token, loginType) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}accounts:login`, {
        method: 'POST',
        body: JSON.stringify({
            third_party_token: token,
            login_type: loginType,
        })
    })
    return response;
};

export const getMyAccount = async () => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}account`, {
        method: 'GET',
        headers: {Authorization: token}
    })
    return response;
};

export const checkAuth = async () => {
    const token = getAuthToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}auth/check`, {
        method: 'GET',
        headers: {Authorization: token}
    })
    return response
}

export const refresh = async () => {
    const refreshToken = getRefreshToken()
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}accounts:refresh`, {
        method: 'POST',
        headers: {Authorization: refreshToken}
    })
    return response
}
