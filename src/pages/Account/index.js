import store from "../../store";
import {fetchAccountDetail} from "../../store/account/action";
import {useSelector} from "react-redux";
import {Typography, Avatar, Button, Card, CardBody, CardFooter} from "@material-tailwind/react";
import {doLogout} from "../../utils/auth";
import {useNavigate} from "react-router-dom";

export default function Account() {

    const account = useSelector(state => state.account.account)
    const navigate = useNavigate();
    const logoutHandler = ()=>{
       doLogout()
       navigate("/")
    }

    return <div className="min-w-[64rem] max-w-5xl mx-auto p-6">
        <Card>
            <CardBody className="flex flex-col gap-4 p-6">
                <Avatar src={account?.avatar} alt="avatar" size="xl"/>

                <div className="flex gap-4">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        姓名
                    </Typography>
                    <Typography variant="h5" color="gray">{account?.name}</Typography>
                </div>


                <div className="flex gap-4">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        E-mail
                    </Typography>
                    <Typography variant="h5" color="gray">{account?.email}</Typography>
                </div>
            </CardBody>

            <CardFooter>
                <Button onClick={logoutHandler}>登出</Button>
            </CardFooter>
        </Card>
    </div>
}

export const accountLoader = () => {
    store.dispatch(fetchAccountDetail())
}