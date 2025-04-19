import { useState } from "react";
import { useTransactions } from "@/context-providers/transactions-context-provider";
import Pagination from "@/components/pagination";
import Search from "./search";
import TBody from "./table-body";
import THead from "./table-head";

export default function Table() {
    const [query, setQuery] = useState({
        search: '',
        sort: {
            key: 'createdAt',
            direction: 'desc'
        },
        limit: 30,
        page: 1,
    });
    const [transactions, balance, totalTransactions] = sortAndFilter(useTransactions(), query);

    //when the user is on the last page and the number of transactions is less than the limit, we set the page to the last page
    if (totalTransactions !== 0 && query?.page > Math.ceil(totalTransactions / query?.limit)) {
        setQuery({ ...query, page: Math.ceil(totalTransactions / query?.limit) });
    }

    function handleChangeQuery(field, value) {
        setQuery((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <>
            <Search balance={balance} onSearch={(value) => handleChangeQuery('search', value)} />
            <div className="table-responsive scrollbar mt-2">
                <table className="table table-bordered">
                    <THead sort={query?.sort} onSort={(value) => handleChangeQuery('sort', value)} />
                    <TBody transactions={transactions} />
                </table>
            </div>
            {
                transactions.length !== 0 &&
                <Pagination onChange={(value) => handleChangeQuery('page', value)} limit={query?.limit} total={totalTransactions} page={query?.page} />
            }
        </>
    )
};

function sortAndFilter(data, { sort, search, page, limit }) {
    let { key, direction } = sort;
    let balance = {
        credit: 0,
        debit: 0,
        pendingCredit: 0,
        pendingDebit: 0
    };
    let transactions = data
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

    const currentPageTransactions = transactions.slice(
        (page - 1) * limit,
        page * limit
    );
    return [currentPageTransactions, balance, transactions.length];
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