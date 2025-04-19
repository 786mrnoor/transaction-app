export default function Pagination({ onChange, limit, total, page }) {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(total / limit); i++) {
        paginationNumbers.push(i);
    }
    return (
        <div>
            <ul className="pagination justify-content-center flex-wrap">
                <li className={"page-item" + (page <= 1 ? ' disabled' : '')}>
                    <button onClick={() => onChange(page - 1)} className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                {paginationNumbers.map(pageNumber => (
                    <li onClick={() => onChange(pageNumber)} className={"page-item" + (page === pageNumber ? " active" : '')} key={pageNumber}>
                        <button className="page-link">{pageNumber}</button>
                    </li>
                ))}

                <li className={"page-item" + (page >= paginationNumbers.length ? ' disabled' : '')}>
                    <button className="page-link" onClick={() => onChange(page + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </div>
    )

};
