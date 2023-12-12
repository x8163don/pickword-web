import {createBrowserRouter, json} from "react-router-dom";
import SingleColumn from "./components/layout/SingleColumn";
import SideMenu from "./components/layout/SideMenu";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Review, {reviewLoader} from "./pages/Review";
import Account, {accountLoader} from "./pages/Account";
import Word from "./pages/Word";
import {checkAuthTokenLoader} from "./utils/auth";
import ReviewSummary from "./pages/Review/ReviewSummary";
import MyMaterial from "./pages/Material/MyMaterial";
import AddMaterial from "./pages/Material/AddMaterail";

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
        path: '/material',
        element: <SideMenu/>,
        loader: checkAuthTokenLoader,
        children: [
            {path: '', element: <MyMaterial/>},
            {path: 'add', element: <AddMaterial/>}
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
        path: '/review',
        element: <SideMenu/>,
        loader: checkAuthTokenLoader,
        children: [
            {path: '', element: <Review/>, loader: reviewLoader},
            {path: ':reviewId/summary', element: <ReviewSummary/>}
        ]
    },
    {
        path: '/account',
        element: <SideMenu/>,
        loader: serializeLoader(checkAuthTokenLoader, accountLoader),
        children: [
            {path: '', element: <Account/>}
        ]
    }
])

function serializeLoader(...loaders) {
    return async () => {
        for (const loader of loaders) {
            const result = await loader()
            if (result != null) {
                return result
            }
        }
        return null
    }
}