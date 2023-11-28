import {Outlet} from "react-router-dom";
import Header from "../Header";

function SingleColumn() {
    return (
        <div className="flex flex-col h-screen">
            <Header></Header>
            <Outlet/>
            <footer id="footer"></footer>
        </div>
    );
}

export default SingleColumn