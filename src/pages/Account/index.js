import store from "../../store";
import {fetchAccountDetail} from "../../store/account/action";
import {useSelector} from "react-redux";
import {Typography, Avatar} from "@material-tailwind/react";

export default function Account() {

    const account = useSelector(state => state.account.account)

    return <div>
        <Avatar src={account.avatar} alt="avatar" size="xl"/>
        <Typography>{account.name}</Typography>
        <Typography>{account.email}</Typography>
    </div>
}

export const accountLoader = () => {
    store.dispatch(fetchAccountDetail())
}