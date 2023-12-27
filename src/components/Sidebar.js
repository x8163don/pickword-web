import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    HomeIcon,
    Square2StackIcon,
    RocketLaunchIcon,
    UserCircleIcon,
    VideoCameraIcon
} from "@heroicons/react/24/solid";
import {useNavigate} from "react-router-dom";
import Logo from "../assets/logo/logo.png";

export default function Sidebar() {

    const navigate = useNavigate();

    const items = [
        {text: "主頁", icon: <HomeIcon className="h-5 w-5"/>, page: "/dashboard"},
        {text: "影片", icon: <VideoCameraIcon className="h-5 w-5"/>, page: "/content"},
        {text: "字卡", icon: <Square2StackIcon className="h-5 w-5"/>, page: "/word"},
        {text: "複習", icon: <RocketLaunchIcon className="h-5 w-5"/>, page: "/review"},
        {text: "帳戶", icon: <UserCircleIcon className="h-5 w-5"/>, page: "/account"},
    ]

    return <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100 rounded-none">
        <div className="mb-2 flex items-center gap-4 p-4">
            <img src={Logo} alt="brand" className="h-8 w-8"/>
            <Typography variant="h5" color="blue-gray">
                PickWord
            </Typography>
        </div>
        <List>
            {
                items.map((item, index) => (
                    <ListItem
                        key={item.text}
                        onClick={() => {
                            navigate(item.page)
                        }}
                    >
                        <ListItemPrefix>
                            {item.icon}
                        </ListItemPrefix>
                        {item.text}
                    </ListItem>
                ))
            }
        </List>
    </Card>

}