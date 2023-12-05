import {getMyAccount} from "../../api/account";
import {accountActions} from "./index";

export const fetchAccountDetail = () => {
    return async (dispatch) => {
        const resp = await getMyAccount()

        if (resp.status !== 200) {
            throw new Error("Login failed")
        }

        sessionStorage.setItem("token", resp.token)

        dispatch(accountActions.login(resp.token))

        const accountData = await getMyAccount()

        dispatch(accountActions.updateAccountInfo(accountData))
    }
}

