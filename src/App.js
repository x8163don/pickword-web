import "./App.css"
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {ThemeProvider} from "@material-tailwind/react";
import {initialize} from "./api/axios";
import {Provider, useDispatch} from "react-redux";
import store from "./store";
import {useEffect} from "react";
import {authActions} from "./store/auth";

function App() {
    initialize()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authActions.checkLoginStatus())
    }, [])


    return (
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
