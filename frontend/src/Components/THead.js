export default function THead({ sortConfig, setSortConfig }) {
    function handleSort(e) {
        let key = e.target.dataset.column;
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction });
    }
    return (
        <thead className="table-dark">
            <tr>
                <th rowSpan={2}>S.N.</th>
                <th className="sortButton" onClick={handleSort} data-column="description" rowSpan={2}>Description</th>
                <th className="sortButton" onClick={handleSort} data-column="type">AMOUNT DR/CR</th>
                <th className="sortButton" onClick={handleSort} data-column="status">STATUS</th>
                <th className="sortButton" onClick={handleSort} data-column="category">CATEGORY</th>
                <th className="sortButton" onClick={handleSort} data-column="createdAt" rowSpan={2}>CREATED</th>
                <th className="sortButton" onClick={handleSort} data-column='updatedAt' rowSpan={2}>UPDATED</th>
            </tr>
        </thead>
    )
};
