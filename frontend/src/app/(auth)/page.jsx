import usePrint from '@/hooks/use-print.js';
import useTitle from '@/hooks/use-title';
import TransactionContextProvider from "@/context-providers/transactions-context-provider";
import Header from './header';
import Table from '@/components/table/index';

export default function Index() {
    const isPrinting = usePrint();

    useTitle();

    return (
        <TransactionContextProvider>
            <div className="my-container p-3 p-lg-4 index-page">
                <Header />
                <hr />
                {isPrinting && (
                    <h2 className='text-center text-success p-2 mb-2 fs-4'>{getPrintableDate()}</h2>
                )
                }
                <Table />
            </div>
        </TransactionContextProvider>
    )
};

function getPrintableDate() {
    let d = new Date();
    let date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    let time = `${hour}:${d.getMinutes()}:${d.getHours() < 12 ? 'AM' : 'PM'}`;

    return `${date}, ${time}`
}