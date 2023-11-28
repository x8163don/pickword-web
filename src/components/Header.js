import {Navbar, Typography, Button} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    PickWord
                </Typography>
                <div className="flex items-center gap-x-1">
                    <Button variant="text" size="md" className="hidden lg:inline-block">
                        <NavLink to="/login"><span>登入</span></NavLink>
                    </Button>
                    <Button
                        variant="gradient"
                        size="md"
                        className="hidden lg:inline-block"
                    >
                        <NavLink to="/register"><span>免費註冊</span></NavLink>
                    </Button>
                </div>
            </div>
        </Navbar>
    );
}
