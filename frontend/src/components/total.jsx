import { useState } from "react"
import axios from "@/helpers/axios";

export default function Total() {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState({});
    
    async function checkBalance(){
        try {
            setLoading(true);
            let data = await axios('/api/balance');
            if(data.error){
                throw data;
            }
            data.balance = (data.credit) - (data.debit);
            setBalance(data);
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div id='transaction-header' className="row justify-content-around align-items-center gx-3 p-2 my-2 bg-secondary-subtle border">
            <span className="col text-success text-nowrap">Credit: {balance.credit}</span>
            <span className="col text-danger text-nowrap">Debit: {balance.debit}</span>
            <span className="col text-success text-nowrap">Pending Credit:  {balance.pendingCredit}</span>
            <span className="col text-danger text-nowrap">Pending Debit:  {balance.pendingDebit}</span>
            <span className="col text-bg-info text-nowrap">Balance:&nbsp;{balance.balance}</span>
            <button className="w-auto btn btn-sm btn-success ms-4" onClick={checkBalance}>{loading ? 'Fetching...' : 'Fetch'}</button>
        </div>
    )
};
