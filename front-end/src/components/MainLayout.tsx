import { Outlet } from "react-router";
import MiniDrawer from './sidebartest'

export function MainLayout() {
    return(
        <div>
            <MiniDrawer />
            <Outlet />
        </div>
    )
}