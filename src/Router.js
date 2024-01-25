import {createBrowserRouter} from "react-router-dom";
import SingleColumn from "./components/layout/SingleColumn";
import SideMenu from "./components/layout/SideMenu";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Account, {accountLoader} from "./pages/Account";
import Word from "./pages/Word";
import {checkAuthTokenLoader} from "./utils/auth";
import Review, {reviewLoader} from "./pages/Review";
import ReviewSetting from "./pages/Review/ReviewSetting";
import ReviewSummary from "./pages/Review/ReviewSummary";
import MyContent from "./pages/Content/MyContent";
import AddMaterial from "./pages/Content/AddContent";
import NotFound from "./pages/System/NotFound";
import Error from "./pages/System/Error";

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
        path: '/content',
        element: <SideMenu/>,
        loader: checkAuthTokenLoader,
        children: [
            {path: '', element: <MyContent/>},
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
            {path: 'setting', element: <ReviewSetting/>},
            {path: ':reviewId/summary', element: <ReviewSummary/>}
        ],
        errorElement: <Error/>
    },
    {
        path: '/account',
        element: <SideMenu/>,
        loader: serializeLoader(checkAuthTokenLoader, accountLoader),
        children: [
            {path: '', element: <Account/>}
        ]
    },
    {
        path: '*',
        element: <SingleColumn/>,
        children: [
            {path: '*', element: <NotFound/>}
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