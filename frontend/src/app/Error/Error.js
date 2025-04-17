import { NavLink } from 'react-router-dom';
import './Error.css';
export default function Error() {
    return (
        <div className='errorPage'>
            <div className="content">
                <h1>404</h1>
                <h3>OOPS! PAGE NOT FOUND</h3>
                <p>Sorry, the page you are looking for could not be found.</p>
                <NavLink to='/'>Go to Home</NavLink>
            </div>
        </div>
    )
}