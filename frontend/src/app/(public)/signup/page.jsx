import './style.css';
import { useState, useActionState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useTitle from '@/hooks/use-title';
import formDataToJson from '@/helpers/form-data-to-json';
import { signup } from '@/actions/user';
import Loader from '@/components/loader';

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
    } catch (err) {
      setError(err);
      // console.log(err);
      return user;
    }
  }

  const [data, action, pending] = useActionState(handleSignUp, { fullName: '', email: '' });

  const [password, setPassword] = useState('');
  return (
    <div className="signupContainer" spellCheck="false">
      <form action={action} autoComplete="off">
        <h1>SignUp</h1>
        <main>
          <div className="inputField">
            <input type="text" name="fullName" defaultValue={data.fullName} required />
            <span>Full Name</span>
            {error.fullName && <p>{error.fullName}</p>}
            <p></p>
          </div>
          <div className="inputField">
            <input type="text" name="email" defaultValue={data.email} required />
            <span>Email</span>
            {error.email && <p>{error.email}</p>}
          </div>
          <div className="inputField">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
            {error.password && <p>{error.password}</p>}
            {error.message && <p>{error.message}</p>}
          </div>
          <div className="passwordChecker">
            <p className={password.search(/[A-Z]/) !== -1 ? 'validate' : ''}>
              One uppercase character
            </p>
            <p className={password.search(/[a-z]/) !== -1 ? 'validate' : ''}>
              One lowercase character
            </p>
            <p className={password.search(/[0-9]/) !== -1 ? 'validate' : ''}>One number(0-9)</p>
            <p className={password.search(/[`~!@#$%^&*)(?.><]/) !== -1 ? 'validate' : ''}>
              One special character
            </p>
            <p className={password.length >= 8 ? 'validate' : ''}>8 characters minimum</p>
          </div>
        </main>
        <footer>
          <button type="submit">Signup</button>
          <p>
            Already have an account?<NavLink to="/login">Login</NavLink>
          </p>
        </footer>
      </form>
      <Loader show={pending} />
    </div>
  );
}
