import {
    Card,
    Typography,
} from "@material-tailwind/react";
import {
    HomeIcon,
    Square2StackIcon,
    RocketLaunchIcon,
    UserCircleIcon,
    VideoCameraIcon
} from "@heroicons/react/24/solid";
import {NavLink} from "react-router-dom";
import Logo from "../assets/logo/logo.png";

export default function Sidebar() {

    const items = [
        {text: "主頁", icon: <HomeIcon className="h-6 w-6"/>, page: "/dashboard"},
        {text: "影片", icon: <VideoCameraIcon className="h-6 w-6"/>, page: "/content"},
        {text: "字卡", icon: <Square2StackIcon className="h-6 w-6"/>, page: "/word"},
        {text: "複習", icon: <RocketLaunchIcon className="h-6 w-6"/>, page: "/review"},
        {text: "帳戶", icon: <UserCircleIcon className="h-6 w-6"/>, page: "/account"},
    ]

    return <Card
        className="h-[calc(100vh)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100 rounded-none">
        <div className="mb-2 flex items-center gap-4 p-4">
            <img src={Logo} alt="brand" className="h-8 w-8"/>
            <Typography variant="h5" color="blue-gray">
                PickWord
            </Typography>
        </div>

        <div className="mt-4 flex flex-col gap-6">
            {
                items.map((item, index) => (
                    <NavLink
                        key={item.text}
                        to={item.page}
                        className={({isActive}) => (isActive ? "bg-gray-400 rounded-md text-gray-50" : "") +" py-2 px-4"}
                    >
                        <div className="flex items-center gap-4">
                            {item.icon}
                            <Typography variant="h6">{item.text}</Typography>
                        </div>
                    </NavLink>
                ))
            }
        </div>
    </Card>

}