import {getMyAccount} from "../../api/account";
import {accountActions} from "./index";

export const fetchAccountDetail = () => {
    return async (dispatch) => {
        const resp = await getMyAccount()

        if (!resp.ok) {
            throw new Error("Cannot get account detail")
        }

        const account = await resp.json()

        dispatch(accountActions.replaceAccountDetail(account))
    }
}

