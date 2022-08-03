
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginLiveModal from '../LoginLiveModal';
import SignupLiveModal from '../SignUpLiveModal';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <LoginLiveModal />
        </li>
        <li>
          <SignupLiveModal />
        </li>
        <li>
          <NavLink to='/servers' exact={true} activeClassName='active'>
            Server
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
