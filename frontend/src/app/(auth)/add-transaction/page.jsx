import useTitle from '@/hooks/use-title';
import TransactionContextProvider from '@/context-providers/transactions-context-provider';
import Table from '@/components/table/index';

import Form from './form';

export default function Page() {
  useTitle('Add Transaction');
  return (
    <TransactionContextProvider>
      <div className="my-container p-3 p-lg-4 index-page">
        <Form />
        <hr />
        <Table />
      </div>
    </TransactionContextProvider>
  );
}
