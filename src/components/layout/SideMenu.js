import {Outlet} from "react-router-dom";
import Sidebar from "../Sidebar";

function SideMenu() {
    return <main className="flex">
        <Sidebar/>
        <div className="flex flex-col justify-between flex-1">
            <Outlet/>
        </div>
    </main>
}

export default SideMenu