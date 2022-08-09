import LogoutButton from "../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux"
import React from 'react';
import { logout } from '../../store/session';

const UserProfileBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };
    


    const dispatch = useDispatch()
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return(
        <>
            <div>
                <img src={sessionUser.profile_pic}></img>
            </div>
            <div>
                <p>{sessionUser.username}</p>
            </div>
            <div className="logout-btn" onClick={openMenu}>
                <i class="fa-solid fa-gear"></i>
            </div>
        </>
    )
}

export default UserProfileBar