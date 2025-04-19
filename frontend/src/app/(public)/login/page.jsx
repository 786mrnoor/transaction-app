import './style.css';
import { useState, useActionState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import useTitle from '@/hooks/use-title';
import formDataToJson from '@/helpers/form-data-to-json';
import { login } from '@/actions/user';
import Loader from '@/components/loader';

export default function Login() {
    useTitle('Login');
    const navigate = useNavigate();
    const [error, setError] = useState({});

    async function handleLogin(prevState, formData) {
        let user;
        try {
            user = formDataToJson(formData);

            await login(user);
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
    const [data, action, pending] = useActionState(handleLogin, { email: '', password: '' });

    return (
        <div className="loginContainer" autoComplete="off">
            <form action={action} spellCheck="false">
                <h1>Login</h1>
                <main>
                    <div className="input-group-float">
                        <input type="text" name="email" defaultValue={data.email} required />
                        <span>Email</span>
                        {error.email &&
                            <p>{error.email}</p>}
                    </div>
                    <div className="input-group-float">
                        <input type="password" name="password" defaultValue={data.password} required />
                        <span>Password</span>
                        {error.password &&
                            <p>{error.password}</p>}
                        {error.message &&
                            <p>{error.message}</p>}
                    </div>
                </main>
                <footer>
                    <button type="submit">Login</button>
                    <p>Don't have an account? <NavLink to="/signup">Signup</NavLink></p>
                </footer>
            </form>
            <Loader show={pending} />
        </div>
    )
};
