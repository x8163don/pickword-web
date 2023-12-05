import {createBrowserRouter} from "react-router-dom";
import SingleColumn from "./components/layout/SingleColumn";
import SideMenu from "./components/layout/SideMenu";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Review from "./pages/Review";
import Account from "./pages/Account";
import Word from "./pages/Word";
import {checkAuthTokenLoader} from "./utils/auth";

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
            {path: '', element: <Login/>}
        ]
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/dashboard',
        element: <SideMenu/>,
        loader: checkAuthTokenLoader,
        children: [
            {path: '', element: <Dashboard/>}
        ]
    },
    {
        path: '/review',
        element: <SideMenu/>,
        loader: checkAuthTokenLoader,
        children: [
            {path: '', element: <Review/>}
        ]
    },
    {
        path: '/word',
        element: <SideMenu/>,
        loader: checkAuthTokenLoader,
        children: [
            {path: '', element: <Word/>}
        ]
    },
    {
        path: '/account',
        element: <SideMenu/>,
        loader: checkAuthTokenLoader,
        children: [
            {path: '', element: <Account/>}
        ]
    }
])