import { useState } from "react";
import { useTransactions } from "../ContextProvider/TransactionContextProvider";
import Pagination from "./Pagination";
import Search from "./Search.js";
import TBody from "./TBody.js";
import THead from "./THead.js";

export default function Table() {
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
    const [search, setSearch] = useState('');
    const [totalTransactions, balance] = sortAndSearch(useTransactions(), sortConfig, search);

    const [pageSize] = useState(30);
    const [page, setPage] = useState(1);

    if (totalTransactions.length !== 0 && page > Math.ceil(totalTransactions.length / pageSize)) {
        setPage(Math.ceil(totalTransactions.length / pageSize));
    }


    function handlePagination(pageNumber) {
        setPage(pageNumber);
    }

    const transactions = totalTransactions.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Search balance={balance} setSearch={setSearch} />
            <div className="table-responsive scrollbar mt-2">
                <table className="table table-bordered">
                    <THead sortConfig={sortConfig} setSortConfig={setSortConfig} />
                    <TBody transactions={transactions} />
                </table>
            </div>
            {
                transactions.length !== 0 &&
                <Pagination handlePagination={handlePagination} postsPerPage={pageSize} length={totalTransactions.length} currentPage={page} />
            }
        </>
    )
};

function sortAndSearch(transactions, sort, search) {
    let { key, direction } = sort;
    let balance = {
        credit: 0,
        debit: 0,
        pendingCredit: 0,
        pendingDebit: 0
    };
    let data = transactions
        .sort((a, b) => {
            let valA = a[key];
            let valB = b[key];
            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;
            return 0;
        })
        .filter((t) => {
            if (t.description.toLowerCase().includes(search)) {
                let key = findKey(t);
                balance[key] += t.amount;
                return true;
            }
            return false;
        });
    return [data, balance];
}

function findKey(tr) {
    let key;
    if (tr.type === 'Cr') {
        if (tr.status === 'completed') {
            key = 'credit';
        } else {
            key = 'pendingCredit';
        }
    } else {
        if (tr.status === 'completed') {
            key = 'debit';
        } else {
            key = 'pendingDebit';
        }
    }
    return key;
}