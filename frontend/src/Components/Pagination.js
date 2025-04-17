export default function Pagination({ handlePagination, postsPerPage, length, currentPage }) {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }
    return (
        <div>
            <ul className="pagination justify-content-center flex-wrap">
                <li className={"page-item" + (currentPage <= 1 ? ' disabled' : '')}>
                    <button onClick={() => handlePagination(currentPage - 1)} className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                {paginationNumbers.map(pageNumber => (
                    <li onClick={() => handlePagination(pageNumber)} className={"page-item" + (currentPage === pageNumber ? " active" : '')} key={pageNumber}>
                        <button className="page-link">{pageNumber}</button>
                    </li>
                ))}

                <li className={"page-item" + (currentPage >= paginationNumbers.length ? ' disabled' : '')}>
                    <button className="page-link" onClick={() => handlePagination(currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </div>
    )

};
