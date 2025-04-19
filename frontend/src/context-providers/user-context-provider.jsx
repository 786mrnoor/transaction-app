import { createContext, useContext, useEffect, useState } from "react"
import me from "@/actions/user";

const UserContext = createContext(null);

export function useGetUser() {
    return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function getUser() {
            try {
                const res = await me(signal);
                setUser(res);
            }
            catch (err) {
                console.error(err);
            }
        }
        getUser();

        return () => {
            controller.abort();
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
};
