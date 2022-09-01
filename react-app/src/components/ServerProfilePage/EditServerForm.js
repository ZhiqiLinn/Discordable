import { getAllServersThunk,  deleteServerThunk } from '../../store/server';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams  } from 'react-router-dom'
import { editServerThunk } from '../../store/server';


const EditServerForm = ({hideForm}) => {
    const {serverId} = useParams()
    const categorySelections = ['Gaming', 'Music', 'Education', 'Science & Tech', 'Entertainment' ]

    // console.log(currentServer)
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const currentServer = useSelector(state => state.serverState[serverId])
    const [name, setName] = useState(currentServer?.name)
    const [server_pic, setServer_pic] = useState(currentServer?.server_pic)
    const [default_role, setDefault_role] = useState(currentServer?.default_role)
    const [category, setCategory] = useState(categorySelections[0])
    const [explore_pic, setExplore_pic] = useState(currentServer?.explore_pic)
    const [description, setDescription]= useState(currentServer?.description)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [showServerProfile, setShowServerProfile] = useState(true)
    const [showDeleteServer, setShowDeleteServer] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [image, setImage] = useState(null);

    //------------------CALL SERVERS AGAIN------------------------
    useEffect(() => {
        let errors = []
        let nameArr = name.split(' ').join('')
        let newRole = default_role.split(' ').join('')
        let newDescription = description.split('').join('')
        if (nameArr.length < 3 || nameArr.length > 50) errors.push("Name should be 3 and 50 characters long, not include white space. Name shouldn't include only white spaces")
        if (!/https?:\/\/.*\.(?:png|jpg|jpeg)/.test(server_pic)) errors.push('Image URL invalid, should be ending with JPG/PNG/JPEG. ie. "https://www.exampleImage.jpg"'
        );
        if (!/https?:\/\/.*\.(?:png|jpg|jpeg)/.test(explore_pic)) errors.push('Image URL invalid, should be ending with JPG/PNG/JPEG. ie. "https://www.exampleImage.jpg"'
        );
        if (newDescription.length <= 0 || newDescription.length > 200) errors.push("Description should be less than 200 characters, not include white space. Role shouldn't include only white spaces")
        if (newRole.length <= 0 || newRole.length > 15) errors.push("Role should be less than 15 characters, not include white space. Role shouldn't include only white spaces")
        setErrors(errors);
        // console.log(default_role)
    }, [name, server_pic, default_role, description, explore_pic]);
    console.log("explore")

    useEffect(async () => {
        await dispatch(getAllServersThunk())
    },[dispatch, serverId])

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const serverPayload = {
            id:serverId,
            user_id: sessionUser.id,
            name: name,
            server_pic: server_pic,
            default_role: default_role,
            description:description,
            explore_pic:explore_pic,
            category:category,
        }
        if (!errors.length) {
            await dispatch(editServerThunk(serverPayload))
            setHasSubmitted(false)
            hideForm();
            history.push(`/servers/${serverId}`)
        }
    }
    const resetPayload = () => {
        setName(currentServer?.name)
        setServer_pic(currentServer?.server_pic)
        setDefault_role(currentServer?.default_role)
        setCategory(currentServer?.category)
        setDescription(currentServer?.description)
        setExplore_pic(currentServer?.explore_pic)

    }

    const handleCancel = () => {
        hideForm();
    }

    
    const handleDeleteSubmit = () => {
        dispatch(deleteServerThunk(serverId));
        hideForm();
        setShowDeleteServer(false)
        history.push(`/servers`)
    }
    
    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }
    // const handleSubmit = async (e) => {
    //     // console.log("!!in handle submit")
    //     e.preventDefault();
    //     const profilePayload = {
    //         id:serverId,
    //         profile_pic:image
    //     }
    //     // console.log(profilePayload)
    //     await dispatch(uploadServerPicThunk(profilePayload))
    //     // console.log("NEWPIC",newPic)
    //     setImage(null)
    //     setShowUpdateModal(false)
    // }


    return(
        <>
            <div className="user-profile-container">
                <div className="edit-server-sidebar">
                    <button className={showServerProfile ? `user-profile-btns actived-profile-btn`: 'user-profile-btns'} 
                            onClick={()=>{
                                setShowServerProfile(true)
                                setShowDeleteServer(false)
                        }}>Overview
                    </button>
                    <button className={showDeleteServer ? `user-profile-btns actived-profile-btn`: 'user-profile-btns'} 
                            onClick={()=>{
                                setShowServerProfile(false)
                                setShowDeleteServer(true)
                        }}> Delete Server
                    </button>
                </div>
            {showDeleteServer && 
                <div className='delete-server-container'>
                    <h2>Are you sure you want to delete this server? </h2>
                    <h2>This action cannot be undone.</h2>
                    <br></br>
                    <div >
                        <button className='btn' onClick={() => hideForm()}>No</button>
                        <br></br>
                        <button className='btn' onClick={handleDeleteSubmit}>Yes</button>
                    </div>
                </div>
            }
            {showServerProfile && 
                <div className='edit-server-container'>
                    <h1>Server Overview</h1>
                    <br></br>
                    <br></br>
                    <div>

                        {hasSubmitted && errors &&
                            <div id='error-msg'>
                                {errors.map((error, ind) => (
                                    <div key={ind} style={{ color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                                ))}
                            </div>
                        }
                    </div>
                    {/* {showUpdateModal && (
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
                    )} */}
                    {/* <div style={{backgroundColor:"#202225", marginTop:"-2%", zIndex:"2", borderRadius:"50%", height:"150px"}}> */}
                    {/* </div> */}
                    {/* <div>
                        <button className="edit-profile-btn" onClick={()=> setShowUpdateModal(true)}>Edit Profile Pic</button>
                    </div> */}
                    <form onSubmit={handleCreate}>
                        <div style={{display:"flex"}}>
                            <img  className='user-menu-img' src={currentServer.server_pic} alt={currentServer.name}></img>
                            <div>
                                Server name
                                <input
                                    style={{width:'180px'}}
                                    placeholder='Server Name'
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
               
                        <div>
                            <div>Set a Role for Your Members</div>
                            <input
                                placeholder='Role'
                                type='text'
                                value={default_role}
                                onChange={(e) => setDefault_role(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Upload Picture for Your Server</div>
                            <input
                                placeholder='Server Logo URL'
                                type='text'
                                value={server_pic}
                                onChange={(e) => setServer_pic(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Upload Background Picture for Your Server</div>
                            <input
                                placeholder='Explore Page Background URL'
                                type='text'
                                value={explore_pic}
                                onChange={(e) => setExplore_pic(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Add a Description in Explore Page</div>
                            <input
                                placeholder='Description'
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Select a Category for Your Server</div>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categorySelections.map(cate =>
                                    <option value={cate} key={cate}>{cate}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <br></br>
                            <button className='btn' type="submit">Save Changes</button>
                            <br></br>
                            <button className='btn' type='button' onClick={resetPayload}>Reset</button>
                            <br></br>
                            <button className='btn' type='button' onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
                
                }
            </div>
        </>
    )
}

export default EditServerForm