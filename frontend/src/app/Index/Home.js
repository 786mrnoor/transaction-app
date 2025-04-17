import { useEffect, useState } from 'react';
import Header from './Header.js';
import Table from '../../Components/Table.js';
import { flushSync } from 'react-dom';

export default function Home() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    function handleBeforePrint() {
      flushSync(() => {
        setIsPrinting(true);
      })
    }

    function handleAfterPrint() {
      setIsPrinting(false);
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    }
  }, []);

  return (
    <>
      <div className="my-container p-3 p-lg-4 index-page">
        <Header />
        <hr />
        {isPrinting && (
          <h2 className='text-center text-success p-2 mb-2 fs-4'>{getPrintableDate()}</h2>
        )
        }
        <Table />
      </div>
    </>
  )
};

function getPrintableDate() {
  let d = new Date();
  let date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  let time = `${hour}:${d.getMinutes()}:${d.getHours() < 12 ? 'AM' : 'PM'}`;

  return `${date}, ${time}`
}