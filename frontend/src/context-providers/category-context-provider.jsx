import { createContext, useContext, useEffect, useReducer, useState } from 'react';

import { getAll } from '@/actions/categories';
import Loader from '@/components/loader';

const CategoryContext = createContext([]);
const CategoryContextDispatch = createContext([]);

export function useCategory() {
  return useContext(CategoryContext);
}
export function useCategoryDispatch() {
  return useContext(CategoryContextDispatch);
}

export default function CategoryContextProvider({ children }) {
  const [categories, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function get() {
      try {
        setLoading(true);
        const data = await getAll();

        if (!ignore) {
          dispatch({ data, type: 'INIT' });
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    get();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <CategoryContext.Provider value={[categories, loading]}>
      <CategoryContextDispatch value={dispatch}>
        <Loader show={loading} />
        {children}
      </CategoryContextDispatch>
    </CategoryContext.Provider>
  );
}

function reducer(state, payload) {
  switch (payload.type) {
    case 'INIT': {
      return payload.data;
    }
    case 'ADD': {
      return [...state, payload.data];
    }
    case 'UPDATE': {
      let { data } = payload;
      const { _id } = data;
      const newState = state.map((s) => {
        if (s._id === _id) return data;
        return s;
      });
      return newState;
    }
    case 'DELETE': {
      const newState = state.filter((s) => s._id !== payload._id);
      return newState;
    }
  }
}
