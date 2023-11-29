import {Outlet} from "react-router-dom";
import Sidebar from "../Sidebar";

function SideMenu() {
    return <main className="flex">
        <Sidebar/>
        <Outlet/>
    </main>
}

export default SideMenu