import LogoutButton from "../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import React from 'react';
import { NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import './User.css'
const UserProfileBar = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };
    


    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return(
        <>
            <div>
                <img className='user-bar-img' src={sessionUser.profile_pic}></img>
            </div>
            <div>
                <p>{sessionUser.username}</p>
            </div>
            <div className="logout-btn" onClick={openMenu}>
                <i class="fa-solid fa-gear"></i>
            </div>
            {showMenu && (
                <div className="user-profile-menu">
                    <div >
                        <img className='user-menu-img' src={sessionUser.profile_pic}></img>
                    </div>
                    <div>
                        <p className='user-menu-name'>{sessionUser.username}</p>
                    </div>
                    <div>
                        <p>🟢 Online</p>
                    </div>
                    <LogoutButton />
                </div>
            )}
        </>
    )
}

export default UserProfileBar