import {checkAuth, login, refresh} from "../api/account";
import {redirect} from "react-router-dom";
import {accountActions} from "../store/account";
import store from "../store";

export const doLogin = async ({thirtyPartyToken, loginType}) => {
    const resp = await login(thirtyPartyToken, loginType)
    if (resp.ok) {
        const tokenDetail = await resp.json()
        sessionStorage.setItem("token", tokenDetail.token)
        sessionStorage.setItem("refreshToken", tokenDetail.refresh_token)
    }
}

export const doLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("refreshToken")
    store.dispatch(accountActions.removeAccountDetail())
}

export const getAuthToken = () => {
    return sessionStorage.getItem("token")
}

export const getRefreshToken = () => {
    return sessionStorage.getItem("refreshToken")
}

export const getExpiredAt = () => {
    const token = getAuthToken()
    if (!token) {
        return 0
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const expiredAt = JSON.parse(jsonPayload).expiredAt
    const now = Date.now()

    return expiredAt - now
}

export const checkAuthTokenLoader = async () => {
    const resp = await checkAuth()

    if (resp.ok) {
        return null
    }

    const refreshToken = getRefreshToken()

    if (!refreshToken) {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("refreshToken")
        return redirect("/login")
    }

    const refreshResp = await refresh()
    if (refreshResp.ok) {
        const refreshTokenDetail = await refreshResp.json()
        sessionStorage.setItem("token", refreshTokenDetail.token)
        sessionStorage.setItem("refreshToken", refreshTokenDetail.refresh_token)
    } else {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("refreshToken")
        return redirect("/login")
    }
    return null
}
