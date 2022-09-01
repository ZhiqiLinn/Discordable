import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const UserProfileLogout = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <> 
        <h1 >Log Out</h1>
        <br></br>
        <p>Are you sure you want to logout?</p>
        <br></br>
        <br></br>
        <br></br>
        <button className="user-profile-logout-btn" onClick={onLogout}>Logout</button>
    </>
    )
};

export default UserProfileLogout;
