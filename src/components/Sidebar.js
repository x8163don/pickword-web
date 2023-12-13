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

export default function Sidebar() {

    const navigate = useNavigate();

    const items = [
        {text: "主頁", icon: <HomeIcon className="h-5 w-5"/>, page: "/dashboard"},
        {text: "影片", icon: <VideoCameraIcon className="h-5 w-5"/>, page: "/content"},
        {text: "字卡", icon: <Square2StackIcon className="h-5 w-5"/>, page: "/word"},
        {text: "複習", icon: <RocketLaunchIcon className="h-5 w-5"/>, page: "/review"},
        {text: "帳戶", icon: <UserCircleIcon className="h-5 w-5"/>, page: "/account"},
    ]

    return <Card className="h-[calc(100vh)] w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray"> </Typography>
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