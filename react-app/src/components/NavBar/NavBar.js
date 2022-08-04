
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DemoUserLogin from '../auth/DemoUser';
import LogoutButton from '../auth/LogoutButton';
import LoginLiveModal from '../LoginLiveModal';
import SignupLiveModal from '../SignUpLiveModal';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <nav>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>

          <NavLink to='/servers' exact={true} activeClassName='active'>
            Server
          </NavLink>

          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>

          <LogoutButton />

    </nav>
    )
  }else{
      sessionLinks = (
        <nav>
                <NavLink to='/' exact={true} activeClassName='active'>
                  Home
                </NavLink>

                <DemoUserLogin />

                <LoginLiveModal />

                <SignupLiveModal />
          </nav>
      )
    }

  return (
    <>
    {sessionLinks}
    </>
  );
}

export default NavBar;
