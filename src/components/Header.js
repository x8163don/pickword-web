import {Navbar, Typography, Button} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import {getAuthToken} from "../utils/auth";

export default function Header() {

    const token = getAuthToken()

    return (
        <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    PickWord
                </Typography>
                <div className="flex items-center gap-x-1">
                    {
                        !token && <>
                            <Button variant="text" size="md" className="hidden lg:inline-block">
                                <NavLink to="/login"><Typography variant="h6">登入</Typography></NavLink>
                            </Button>
                            <Button
                                variant="gradient"
                                size="md"
                                color="light-blue"
                                className="hidden lg:inline-block"
                            >
                                <NavLink to="/register">
                                    <Typography variant="h6" className="text-white">立即加入</Typography>
                                </NavLink>
                            </Button>
                        </>
                    }
                    {
                        token && <Button
                            variant="gradient"
                            size="md"
                            color="light-blue"
                            className="hidden lg:inline-block"
                        >
                            <NavLink to="/dashboard">
                                <Typography variant="h6" className="text-white">我的主頁</Typography>
                            </NavLink>
                        </Button>
                    }
                </div>
            </div>
        </Navbar>
    );
}
