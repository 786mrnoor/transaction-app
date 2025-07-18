import { createContext, useContext, useMemo, useReducer } from 'react';

import { useCategory } from './category-context-provider';

const TransactionContext = createContext([]);
const TransactionDispatchContext = createContext([]);

export function useTransactions() {
  return useContext(TransactionContext);
}
export function useTransactionDispatch() {
  return useContext(TransactionDispatchContext);
}

export default function TransactionContextProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, []);

  const [category] = useCategory();
  const categories = useMemo(() => {
    if (category.length <= 0) return {};
    let obj = {};
    category.forEach((c) => (obj[c._id] = c.title));
    return obj;
  }, [category]);

  let data = transactions.map((t) => {
    t.category = categories[t.categoryId];
    return t;
  });

  return (
    <TransactionContext value={data}>
      <TransactionDispatchContext value={dispatch}>{children}</TransactionDispatchContext>
    </TransactionContext>
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
    case 'DELETE': {
      let id = payload._id;
      return state.filter((s) => s._id !== id);
    }
    default:
      return state;
  }
}
