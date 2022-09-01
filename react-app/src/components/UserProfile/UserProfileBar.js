import LogoutButton from "../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux"
import React, { useState } from 'react';
import { MsgModal } from '../../context/MsgModal';
import { Modal } from '../../context/Modal';

import { useHistory } from "react-router-dom";
import { uploadProfilePicThunk } from '../../store/session';
import './User.css'
import UserProfileLogout from "./UserProfileLogout";

const UserProfileBar = () => {
    const dispatch = useDispatch()
    // const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const [image, setImage] = useState(null);
    const [showAccount, setShowAccount] = useState(true)
    const [showLogout, setShowLogout] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      }; 
    
      console.log(showUpdateModal)

      const handleSubmit = async (e) => {
        e.preventDefault();
        const profilePayload = {
            profile_pic:image
        }
        // console.log(profilePayload)
        await dispatch(uploadProfilePicThunk(profilePayload))
        // console.log("NEWPIC",newPic)
        setImage(null)
        setShowMenu(false)
        // history.go('/servers')
    }


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setShowUpdateModal(false)
    }


    return(
        <>
            {showMenu && (
                <MsgModal onClose={() => setShowMenu(false)}>
                    <div className="user-profile-container">
                        <div className="user-profile-close" onClick={()=>setShowMenu(false)}>
                            <i className="fa-regular fa-circle-xmark fa-2x" style={{color:"white", cursor:"pointer"}}></i>
                        </div>
                        <div className="user-profile-sidebar">
                            <button className={showAccount ? `user-profile-btns actived-profile-btn`: 'user-profile-btns'} 
                                    onClick={()=>{
                                        setShowAccount(true)
                                        setShowLogout(false)
                                }}>My Account 
                            </button>
                            <button className={showLogout ? `user-profile-btns actived-profile-btn`: 'user-profile-btns'} 
                                    onClick={()=>{
                                        setShowAccount(false)
                                        setShowLogout(true)
                                }}> Logout 
                            </button>
                        </div>
                        <div className="user-profile-menu">
                            <div>
                                { showLogout && <UserProfileLogout/>}
                            </div>
                            {
                                showAccount && (
                                    <div >
                                        <div className="user-profile-detail" onClick={() => setShowMenu(true)}>
                                            <img  className='user-menu-img' src={sessionUser.profile_pic} alt={sessionUser.username}></img>
                                            <div>
                                                <p className='user-menu-name'>{sessionUser.username}</p>
                                                <p>🟢 Online</p>
                                                <button onClick={()=> setShowUpdateModal(true)}>Edit Profile Pic</button>
                                            </div>
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
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </MsgModal>
                )}

            <div>
                <img className='user-bar-img' src={sessionUser.profile_pic}  alt={sessionUser.username}></img>
            </div>
            <div>
                <p>{sessionUser.username}</p>
            </div>
            <div className="logout-btn" onClick={openMenu}>
                <i className="fa-solid fa-gear fa-1.5x" style={{cursor:"pointer"}}></i>
            </div>
        </>
    )
}

export default UserProfileBar