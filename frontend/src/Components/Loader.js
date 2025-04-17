import { useEffect } from 'react';
import './Loader.css';

function stopTabKey(e) {
    e.preventDefault();
}

export default function Loader({ show }) {
    useEffect(() => {
        if (show) {
            document.addEventListener('keydown', stopTabKey);
        } else {
            document.removeEventListener('keydown', stopTabKey);
        }
    }, [show])
    return (
        <div id="loaderContainer" style={{ display: show ? 'flex' : 'none' }}>
            <div className="loader"></div>
        </div>
    )
};