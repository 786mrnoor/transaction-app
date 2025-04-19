import Form from "@/components/form";
import { add } from "@/actions/transactions";
import { useTransactionDispatch } from "@/context-providers/transactions-context-provider";

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
