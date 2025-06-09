import type { RouteObject } from "react-router";
import { MainLayout } from "../components/MainLayout";
import { UserAdmin } from "../pages/UserAdmin";
import { Home } from "../pages/Home";

export const routes: RouteObject[] = [
    {
    path: "/",
    Component: MainLayout,
    children: [
        {
            index: true, Component: Home
        },
        {
            path: 'home' , Component: Home
        },
        {
            path: 'user-admin', Component: UserAdmin
        }
    ]
  },
]