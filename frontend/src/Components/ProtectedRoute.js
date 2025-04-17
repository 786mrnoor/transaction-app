import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import UserContextProvider from "../ContextProvider/UserContextProvider";
import CategoryContextProvider from "../ContextProvider/CategoryContextProvider";
import Total from "./Total";

export default function ProtectedRoute() {
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
