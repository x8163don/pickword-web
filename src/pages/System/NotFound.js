import NotFoundImg from "../../assets/404.svg";
import {Button, Typography} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";

export default function NotFound() {
    return <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-1/3">
            <img src={NotFoundImg} alt="404 not found"/>
        </div>

        <Typography color="gray" variant="h3">找不到這個頁面...</Typography>
        <Button
            className="mt-6"
            color="light-blue"
            size="lg">
            <NavLink to="/">
                <Typography variant="h4">回首頁</Typography>
            </NavLink>
        </Button>
    </div>
}