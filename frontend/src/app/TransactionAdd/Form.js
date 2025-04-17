import Form from "../../Components/Form";
import { add } from "../../api/transactions";
import { useTransactionDispatch } from "../../ContextProvider/TransactionContextProvider";

export default function MyForm() {
    const dispatch = useTransactionDispatch();

    async function handleSubmit(tr) {
        let data = await add(tr);
        dispatch({ type: "ADD", data });
    }

    return (
        <Form onFormSubmit={handleSubmit} show={true} />
    )
};
