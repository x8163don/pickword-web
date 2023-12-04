import {checkAuth, getMyAccount, login} from "../../api/account";
import {authActions} from "./index";

export const fetchLogin = (thirtyPartyToken) => {
    return async (dispatch) => {
        const resp = await login(thirtyPartyToken, "google")

        if (!resp.token) {
            throw new Error("Login failed")
        }

        sessionStorage.setItem("token", resp.token)

        dispatch(authActions.login(resp.token))

        const accountData = await getMyAccount()

        dispatch(authActions.updateAccountInfo(accountData))
    }
}

export const checkLoginStatus = () => {
    return async (dispatch) => {
        const token = sessionStorage.getItem("token")
        if (!token) {
            dispatch(authActions.logout())
        }

        try {
            await checkAuth();
            dispatch(authActions.login(token))
        } catch (e) {
            dispatch(authActions.logout())
        }
    }
}

