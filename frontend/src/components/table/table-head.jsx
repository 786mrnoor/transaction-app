export default function THead({ sort, onSort }) {
    function handleSort(e) {
        let key = e.target.dataset.column;
        let direction = 'asc';
        if (sort.key === key && sort.direction === 'asc') {
            direction = 'desc'
        }
        onSort({ key, direction });
    }
    return (
        <thead className="table-dark">
            <tr>
                <th>S.N.</th>
                <th className="sortButton" onClick={handleSort} data-column="description">Description</th>
                <th className="sortButton" onClick={handleSort} data-column="type">AMOUNT DR/CR</th>
                <th className="sortButton" onClick={handleSort} data-column="status">STATUS</th>
                <th className="sortButton" onClick={handleSort} data-column="category">CATEGORY</th>
                <th className="sortButton" onClick={handleSort} data-column="createdAt">CREATED</th>
                <th className="sortButton" onClick={handleSort} data-column='updatedAt'>UPDATED</th>
            </tr>
        </thead>
    )
};
