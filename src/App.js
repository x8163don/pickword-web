import "./App.css"
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {ThemeProvider} from "@material-tailwind/react";
import {Provider} from "react-redux";
import store from "./store";
import {useEffect} from "react";
import {checkAuthTokenLoader, getAuthToken, getExpiredAt} from "./utils/auth";

function App() {

    useEffect(() => {
        const token = getAuthToken()
        if (!token) {
            return
        }

        const expire = getExpiredAt()
        if (expire <= 0) {
            checkAuthTokenLoader()
        } else {
            setTimeout(checkAuthTokenLoader, expire)
        }

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
