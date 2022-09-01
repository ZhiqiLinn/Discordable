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
        <h3>Log Out</h3>
        <p>Are you sure you want to logout?</p>
        <button onClick={onLogout}>Logout</button>
    </>
    )
};

export default UserProfileLogout;
