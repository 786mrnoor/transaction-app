import timeAgo from "../../helpers/timeAgo";

export default function Category({ data, edit, children }) {
    return (
        <li
            className={"list-group-item category-list-item" +
                (edit._id === data._id ? " bg-info-subtle" : '')}
        >
            <div>
                <p className="fw-bold m-0 lh-1">{data.title}</p>
                <span className="my-fs-sm">{timeAgo(data.createdAt)}</span>
            </div>
            <div className="btn-group">
                {children}
            </div>
        </li>
    )
};
