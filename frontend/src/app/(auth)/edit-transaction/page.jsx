import Form from "@/components/form";
import { get, putTr } from "@/actions/transactions";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyForm() {
    const [transaction, setTransaction] = useState(null);
    const [{ error, updated }, setStatus] = useState({ error: null, updated: false });
    const { id } = useParams();

    async function handleSubmit(tr) {
        try {
            tr._id = id;
            await putTr(tr);
            setStatus({ error: false, updated: true });
        } catch (error) {
            setStatus(s => ({ ...s, error }));
            throw error;
        }
    }

    useEffect(() => {
        let ignore = false;
        async function g() {
            try {
                let data = await get(id);
                if (ignore) return;
                setTransaction(data);
            } catch (error) {
            }
        }
        g();

        return () => {
            ignore = true;
        }
    }, [id]);

    return (
        <div className="my-container p-3 p-lg-4 index-page">
            {
                !updated && transaction &&
                <Form onFormSubmit={handleSubmit} initValue={transaction} />
            }
            {
                !transaction && <p>Loading...</p>
            }
            {
                error && <p className="text-danger text-center mt-4 fs-2">Some Error Occurred!</p>
            }
            {
                updated && <p className="text-success text-center mt-4 fs-2">Successfully Updated</p>
            }
        </div>
    )
};
