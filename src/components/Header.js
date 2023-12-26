import {Navbar, Typography, Button} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import {getAuthToken} from "../utils/auth";
import LogoWithName from "../assets/logo/logo-with-name.svg";

export default function Header() {

    const token = getAuthToken()

    return (
        <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <div className="h-12">
                    <img alt="logo" className="w-full h-full" src={LogoWithName}/>
                </div>
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
                                    <Typography variant="h6" className="text-white">立即註冊</Typography>
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
