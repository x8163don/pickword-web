import "./App.css"
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {ThemeProvider} from "@material-tailwind/react";
import {Provider} from "react-redux";
import store from "./store";




function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
