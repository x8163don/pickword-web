import store from "../../store";
import {fetchAccountDetail} from "../../store/account/action";
import {useSelector} from "react-redux";

export default function Account() {

    const account = useSelector(state => state.account.account)

    return <div>Account</div>
}

export const accountLoader = () => {
    store.dispatch(fetchAccountDetail())
}