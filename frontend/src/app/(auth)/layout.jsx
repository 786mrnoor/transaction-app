import { Outlet } from "react-router-dom";
import Nav from "@/components/nav";
import UserContextProvider from "@/context-providers/user-context-provider";
import CategoryContextProvider from "@/context-providers/category-context-provider";
import Total from "@/components/total";

export default function Layout() {
    return (
        <UserContextProvider>
            <CategoryContextProvider>
                <Nav />
                <Total />
                <Outlet />
            </CategoryContextProvider>
        </UserContextProvider>
    )
};
