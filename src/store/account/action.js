import {getMyAccount} from "../../api/account";
import {accountActions} from "./index";

export const fetchAccountDetail = () => {
    return async (dispatch) => {
        const resp = await getMyAccount()

        if (resp.ok) {
            throw new Error("Login failed")
        }

        const account = await resp.json()

        dispatch(accountActions.replaceAccountDetail(account))
    }
}

