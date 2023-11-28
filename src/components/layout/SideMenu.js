import {Outlet} from "react-router-dom";

function SideMenu() {
    return (
        <main>
            <div>SideMenu</div>
                <Outlet/>
        </main>
    );
}

export default SideMenu