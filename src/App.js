import "./App.css"
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {ThemeProvider} from "@material-tailwind/react";
import {AuthContextProvider} from "./context/AuthContext";

function App() {
    return (
        <AuthContextProvider>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </AuthContextProvider>
    );
}

export default App;
