
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DemoUserLogin from '../auth/DemoUser';
import LogoutButton from '../auth/LogoutButton';
import LoginLiveModal from '../LoginLiveModal';
import SignupLiveModal from '../SignUpLiveModal';
import './NavBar.css'
import logo from './logo.png'
const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <nav className='nav-bar-div'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={logo} alt='discordable' width="110px" height="25px"></img>
          </NavLink>
        </div>
        <div className='nav-mid-part'>
            <div>
              <a href='https://discord.com/download'>Discord Download</a>
            </div>
            <div>
              <a href='https://discord.com/download'>Features</a>
            </div>
            <div>
              <a href='https://github.com/ZhiqiLinn'>GitHub </a>
            </div>
            <div>
              <a href='https://www.linkedin.com/in/zhiqi-linn/'>LinkedIn </a>
            </div>
            <div>
              <NavLink to='/servers' exact={true} activeClassName='active'>
                Server
              </NavLink>
            </div>
            <div>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </div>
          </div>
        <div>
          <LogoutButton />
        </div>

    </nav>
    )
  }else{
      sessionLinks = (
        <nav className='nav-bar-div'>
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img src={logo} alt='discordable' width="110px" height="25px"></img>
            </NavLink>
          </div>
          <div className='nav-mid-part'>
            <div>
              <a href='https://discord.com/download'>Discord Download</a>
            </div>
            <div>
              <a href='https://discord.com/download'>Features</a>
            </div>
            <div>
              <a href='https://github.com/ZhiqiLinn'>GitHub </a>
            </div>
            <div>
              <a href='https://www.linkedin.com/in/zhiqi-linn/'>LinkedIn </a>
            </div>
            <div>
              <LoginLiveModal />
            </div>
            <div>
              <SignupLiveModal />
            </div>
          </div>
          <div>
            <DemoUserLogin />
          </div>
        </nav>
      )
    }

  return (
    <div className='nav-bar-container'>
    {sessionLinks}
    </div>
  );
}

export default NavBar;
