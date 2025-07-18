import debounce from '@/helpers/debounce';

export default function Search({ balance, onSearch }) {
  const handleInput = debounce((e) => {
    onSearch(e.target.value.toLowerCase());
  }, 300);
  return (
    <div className="row justify-content-end mt-3 gy-2 bg-body-secondary pb-2">
      <span className="col text-success text-nowrap">Credit: {balance.credit}</span>
      <span className="col text-danger text-nowrap">Debit: {balance.debit}</span>
      <span className="col text-success text-nowrap">Pending Credit: {balance.pendingCredit}</span>
      <span className="col text-danger text-nowrap">Pending Debit: {balance.pendingDebit}</span>
      <span className="col text-bg-info text-nowrap">
        Balance:&nbsp;{balance.credit - balance.debit}
      </span>
      <div className="col col-8 col-sm-6 col-md-5 col-lg-4">
        <input
          type="text"
          onInput={handleInput}
          className="form-control form-control-sm"
          name="search"
          placeholder="Search"
          required
        />
      </div>
    </div>
  );
}
