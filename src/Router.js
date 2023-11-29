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
        children: [
            {path: '', element: <Dashboard/>}
        ]
    },
    {
        path: '/review',
        element: <SideMenu/>,
        children: [
            {path: '', element: <Review/>}
        ]
    },
    {
        path: '/word',
        element: <SideMenu/>,
        children: [
            {path: '', element: <Word/>}
        ]
    },
    {
        path: '/Account',
        element: <SideMenu/>,
        children: [
            {path: '', element: <Account/>}
        ]
    }
])