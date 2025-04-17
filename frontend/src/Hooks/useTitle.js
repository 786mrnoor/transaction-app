import { useEffect } from "react";

const TITLE = 'Transaction Management';
export default function useTitle(title) {
    useEffect(() => {
        if (title) {
            document.title = `${title} | ${TITLE}`;
        } else {
            document.title = TITLE;
        }
    }, [title]);
};
