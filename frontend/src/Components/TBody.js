import { deleteTr } from "../api/transactions";
import { useTransactionDispatch } from "../ContextProvider/TransactionContextProvider";
import { Link } from "react-router-dom";
import timeAgo from "../helpers/timeAgo";


export default function TBody({ transactions }) {
    const dispatch = useTransactionDispatch();


    async function handleDelete(trId) {
        if (window.confirm('Are You Sure You Want To Delete This Transaction!')) {
            try {
                await deleteTr(trId);;
                dispatch({ type: 'DELETE', _id: trId });
                window.alert('Deleted Successfully');
            } catch (error) {
                console.log(error);
                window.alert(error.message);
            }
        }
    }

    return (
        <tbody id="tableBody" className="table-group-divider">
            {transactions.map((transaction, i) => (
                <tr key={transaction._id} className={transaction.status === 'pending' ? 'table-danger' : ''}>
                    <td>{i + 1}</td>
                    <td>{transaction.description}</td>
                    <td className={transaction.type === 'Cr' ? 'text-success' : 'text-danger'}>{transaction.amount} {transaction.type}</td>
                    <td>{transaction.status}</td>
                    <td>
                        {transaction.category}
                    </td>
                    <td>{timeAgo(transaction.createdAt)} ago</td>
                    <td className="text-center">
                        <span className="fs-8 me-2">{timeAgo(transaction.updatedAt)}</span>
                        <div className="btn-group">
                            <Link to={`/edit-transaction/${transaction._id}`} className="btn btn-primary btn-sm">Edit</Link>
                            <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(transaction._id)}>Delete</button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
};
