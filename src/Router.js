import {createBrowserRouter} from "react-router-dom";
import SingleColumn from "./components/layout/SingleColumn";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <SingleColumn/>,
        children: [
            {path: '', element: <Home/>}
        ]
    },
    {
        path: '/login',
        element: <SingleColumn/>,
        children: [
            {path: '', element: <Login />}
        ]
    },
    {
        path: '/register',
        element: <Register/>
    },
])