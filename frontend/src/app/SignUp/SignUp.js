import './SignUp.css';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import useTitle from '../../Hooks/useTitle.js';
import { useActionState } from 'react';
import formDataToJson from '../../helpers/formDataToJson.js';
import { signup } from '../../api/user.js';
import Loader from '../../Components/Loader.js';

export default function SignUp() {
    useTitle('Signup');
    const navigate = useNavigate();
    const [error, setError] = useState({});

    async function handleSignUp(prevState, formData) {
        let user;
        try {
            user = formDataToJson(formData);

            await signup(user);
            // console.log(data);

            setError({});
            navigate('/');
            return user;
        }
        catch (err) {
            setError(err);
            // console.log(err);
            return user;
        }
    }

    const [data, action, pending] = useActionState(handleSignUp, { fullName: '', email: '', password: '' });

    return (
        <div className="signupContainer" spellCheck="false">
            <form action={action} autoComplete="off">
                <h1>SignUp</h1>
                <main>
                    <div className="inputField">
                        <input type="text" name="fullName" defaultValue={data.fullName} required />
                        <span>Full Name</span>
                        {error.fullName &&
                            <p>{error.fullName}</p>}
                        <p></p>
                    </div>
                    <div className="inputField">
                        <input type="text" name="email" defaultValue={data.email} required />
                        <span>Email</span>
                        {error.email &&
                            <p>{error.email}</p>}
                    </div>
                    <div className="inputField">
                        <input type="password" name="password" defaultValue={data.password} required />
                        <span>Password</span>
                        {error.password &&
                            <p>{error.password}</p>}
                        {error.message &&
                            <p>{error.message}</p>}
                    </div>
                    <div className="passwordChecker">
                        <p className={data.password.search(/[A-Z]/) !== -1 ? 'validate' : ''}>One uppercase character</p>
                        <p className={data.password.search(/[a-z]/) !== -1 ? 'validate' : ''}>One lowercase character</p>
                        <p className={data.password.search(/[0-9]/) !== -1 ? 'validate' : ''}>One number(0-9)</p>
                        <p className={data.password.search(/[`~!@#$%^&*)(?.><]/) !== -1 ? 'validate' : ''}>One special character</p>
                        <p className={data.password.length >= 8 ? 'validate' : ''}>8 characters minimum</p>
                    </div>
                </main>
                <footer>
                    <button type="submit">Signup</button>
                    <p>Already have an account?<NavLink to="/login">Login</NavLink></p>
                </footer>
            </form>
            <Loader show={pending} />
        </div>
    )
};