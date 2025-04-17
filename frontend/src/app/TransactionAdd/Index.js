import TransactionContextProvider from "../../ContextProvider/TransactionContextProvider.js";
import useTitle from '../../Hooks/useTitle.js';
import Home from './Home.js';

export default function Index() {
    useTitle();
    return (
        <TransactionContextProvider>
            <Home />
        </TransactionContextProvider>
    )
};
