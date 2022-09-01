import LogoutButton from "../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux"
import React, { useState } from 'react';
import { MsgModal } from '../../context/MsgModal';
import { PicModal } from '../../context/PicModal';

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
        setShowMenu(true)
        setShowUpdateModal(false)
    }


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
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
                            
                            { showLogout && 
                                <div className="user-logout">
                                    <UserProfileLogout/>
                                </div>
                            }
                            {
                                showAccount && (
                                    < >
                                        <div className="color-cover"> </div>
                                        <div className="user-profile-detail" >
                                            <div style={{backgroundColor:"#202225", marginTop:"-2%", zIndex:"2", borderRadius:"50%", height:"150px"}}>
                                                <img  className='user-menu-img' src={sessionUser.profile_pic} alt={sessionUser.username}></img>
                                            </div>
                                            <div className="user-menu-detail">
                                                <p className='user-menu-name'>{sessionUser.username}</p>
                                                <button className="edit-profile-btn" onClick={()=> setShowUpdateModal(true)}>Edit Profile Pic</button>
                                            </div>
                                        </div> 
                                        <div className='user-menu-email'>
                                            <p style={{fontSize:"small", color:"#787A7E", fontWeight:"bold"}}>EMAIL</p>
                                            <p >{sessionUser.email}</p>
                                        </div>
                                            {showUpdateModal && (
                                                <PicModal onClose={() => setShowUpdateModal(false)}>
                                                    <div className='upload-img-div'>
                                                        <h2>Select An Image</h2>
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
                                                                <br></br>
                                                                <br></br>
                                                            
                                                                <div >
                                                                    <button className="user-profile-uplaod-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                                                                    <button className="user-profile-uplaod-btn" type="submit" style={{marginRight:'10px'}}>Change</button>
                                                                </div>
                                                            </form>
                                                            <br></br>
                                                        </div>
                                                    </div>
                                                </PicModal>
                                            )}
         
                                    </>
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