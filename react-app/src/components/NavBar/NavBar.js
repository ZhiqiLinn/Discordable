
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DemoUserLogin from '../auth/DemoUser';
import LogoutButton from '../auth/LogoutButton';
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
            <img src={logo} alt='discordable' width="155px" height="46px"></img>
          </NavLink>
        </div>
        <div className='nav-mid-part'>
            <div>
              <a href='https://discord.com/download'>Discord Download</a>
            </div>
            <div>
              <a href='https://github.com/ZhiqiLinn/Discordable/wiki/HOW-TO-USE-DISCORDABLE'>Features</a>
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
          </div>
        <div className="nav-logout-btn">
          <LogoutButton />
        </div>

    </nav>
    )
  }else{
      sessionLinks = (
        <nav className='nav-bar-div'>
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img src={logo} alt='discordable' width="155px" height="46px"></img>
            </NavLink>
          </div>
          <div className='nav-mid-part'>
            <div>
              <a href='https://discord.com/download'>Discord Download</a>
            </div>
            <div>
              <a href='https://github.com/ZhiqiLinn/Discordable/wiki/HOW-TO-USE-DISCORDABLE'>Features</a>
            </div>
            <div>
              <a href='https://github.com/ZhiqiLinn'>GitHub </a>
            </div>
            <div>
              <a href='https://www.linkedin.com/in/zhiqi-linn/'>LinkedIn </a>
            </div>
            <div>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
            <div>
              <NavLink to='/signup' exact={true} activeClassName='active'>
                Signup
              </NavLink>
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
