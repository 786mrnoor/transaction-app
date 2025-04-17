import { createContext, useContext } from "react";
import { add, deleteCategory, getAll, update } from "../api/categories";
import useAsyncState from "../Hooks/useAsyncState";
import Loader from "../Components/Loader";


const CategoryContext = createContext([]);
const CategoryContextDispatch = createContext([]);

export function useCategory() {
    return useContext(CategoryContext);
}
export function useCategoryDispatch() {
    return useContext(CategoryContextDispatch);
}

export default function CategoryContextProvider({ children }) {
    const [categories, dispatch, loading, error] = useAsyncState(reducer, [], getAll);

    return (
        <CategoryContext.Provider value={categories}>
            <CategoryContextDispatch value={[dispatch, loading, error]}>
                <Loader show={loading} />
                {children}
            </CategoryContextDispatch>
        </CategoryContext.Provider>
    )
};

async function reducer(type, payload) {
    if (type === 'INIT') {
        return [];
    }
    if (type === 'ADD') {
        const data = await add(payload);
        return (state) => {
            return [...state, data];
        };
    }
    if (type === 'UPDATE') {
        const data = await update(payload);
        return (state) => {
            let id = payload._id;
            const newState = state.map((s) => {
                if (s._id === id) return data;
                return s;
            });
            return newState;
        };
    }
    if (type === 'DELETE') {
        const data = await deleteCategory(payload);
        return (state) => {
            const newState = state.filter((s) => s._id !== payload);
            return newState;
        };
    }
}