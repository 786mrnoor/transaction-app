import { NavLink } from 'react-router-dom';

import logo from '@/assets/profile.png';
import { useGetUser } from '@/context-providers/user-context-provider';
import axios from '@/helpers/axios';

export default function Profile({ onCloseProfile }) {
  const user = useGetUser();
  async function handleSignOut() {
    try {
      await axios('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangePic() {
    try {
      // showLoader(true);
      // await User.update({uid: user.uid, photoURL: e.target.files[0]})
      onCloseProfile();
      // showLoader(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className="profile">
      <p>{user?.email}</p>
      <div className="imgContainer">
        <img src={user?.photoURL || logo} alt="Profile Pic" className="btn" />
        <input
          type="file"
          id="profileInput"
          accept="image/*"
          onChange={handleChangePic}
          style={{ display: 'none' }}
        />
        <label htmlFor="profileInput">edit</label>
        <h2>Hi, {user?.fullName}!</h2>
        <NavLink to="/manage-account">Mange your account</NavLink>
        <footer>
          <button type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </footer>
      </div>
    </div>
  );
}
