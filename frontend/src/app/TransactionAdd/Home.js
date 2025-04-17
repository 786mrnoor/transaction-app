import Form from './Form.js';
import Table from '../../Components/Table.js';

export default function Home() {

  return (
    <>
      <div className="my-container p-3 p-lg-4 index-page">
        <Form/>
        <hr />
        <Table />
      </div>
    </>
  )
};