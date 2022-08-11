import LogoutButton from "../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux"
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import { uploadProfilePicThunk } from '../../store/session';
import './User.css'

const UserProfileBar = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [image, setImage] = useState(null);
    
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      }; 
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        const profilePayload = {
            profile_pic:image
        }
        // console.log(profilePayload)
        await dispatch(uploadProfilePicThunk(profilePayload))
        // console.log("NEWPIC",newPic)
        setImage(null)
        setShowUpdateModal(false)
        // history.go('/servers')
    }


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }


    return(
        <>

            <div>
                <img className='user-bar-img' src={sessionUser.profile_pic}  alt={sessionUser.username}></img>
            </div>
            <div>
                <p>{sessionUser.username}</p>
            </div>
            <div className="logout-btn" onClick={openMenu}>
                <i className="fa-solid fa-gear fa-1.5x" style={{cursor:"pointer"}}></i>
            </div>
            {showMenu && (
                <>
                <div className="user-profile-menu">
                    <div className="user-profile-close" onClick={()=>setShowMenu(false)}>
                        <i className="fa-solid fa-circle-xmark fa-lg" style={{cursor:"pointer"}}></i>
                    </div>
                    <div onClick={() => setShowUpdateModal(true)}>
                        <div className="grey-cover"></div>
                        <div className="img-update"><i className="fa-solid fa-camera-retro" style={{cursor:"pointer"}}></i></div>
                        <img  className='user-menu-img' src={sessionUser.profile_pic} alt={sessionUser.username}></img>
                    </div>
                    <div>
                        <p className='user-menu-name'>{sessionUser.username}</p>
                    </div>
                    <div>
                        <p>🟢 Online</p>
                    </div>
                    <div>
                        {showUpdateModal && (
                            <Modal onClose={() => setShowUpdateModal(false)}>
                            <div className='upload-img-div'>
                                <h2>Select Your Profile Picture</h2>
                                <div>
                                    <form className='upload-img-form' onSubmit={handleSubmit}>
                                            <input
                                                className="upload-pic-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={updateImage}
                                            />
                                        <br></br>
                                        <br></br>
                                        <div className='delete-biz-buttons'>
                                            <button className="modal-cancel" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                                            <button type="submit" style={{marginRight:'10px'}}>Change</button>
                                        </div>
                                    </form>
                                    <br></br>
                                </div>
                            </div>
                        </Modal>
                        )}
                    </div>
                    <div className="user-profile-logout-btn">
                        <LogoutButton />

                    </div>
                </div>
                </>
            )}
        </>
    )
}

export default UserProfileBar