import { getAllServersThunk, getServerThunk } from '../../store/server';

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams,  } from 'react-router-dom'
import { editServerThunk, uploadServerPicThunk } from '../../store/server';


const EditServerForm = ({hideForm, serverId}) => {
    // console.log(currentServer)
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const currentServer = useSelector(state => state.serverState[serverId])
    const [name, setName] = useState(currentServer?.name)
    const [server_pic, setServer_pic] = useState(currentServer?.server_pic)
    const [default_role, setDefault_role] = useState(currentServer?.default_role)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [image, setImage] = useState(null);

    //------------------CALL SERVERS AGAIN------------------------
    // useEffect(() => {
    //     let errors = []
    //     let nameArr = name.split(' ').join('')
    //     let newRole = default_role.split(' ').join('')
    //     if (nameArr.length < 3 || nameArr.length > 50) errors.push("Name should be 3 and 50 characters long, not include white space. Name shouldn't include only white spaces")
    //     // if (!/https?:\/\/.*\.(?:png|jpg|jpeg)/.test(server_pic)) errors.push('Image URL invalid, should be ending with JPG/PNG/JPEG. ie. "https://www.exampleImage.jpg"'
    //     // );
    //     if (newRole.length <= 0 || newRole.length > 15) errors.push("Role should be less than 15 characters, not include white space. Role shouldn't include only white spaces")
    //     setErrors(errors);
    //     // console.log(default_role)
    // }, [name, default_role]);

    useEffect(() => {
            dispatch(getAllServersThunk())
    },[dispatch])

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const serverPayload = {
            id:serverId,
            user_id: sessionUser.id,
            name: name,
            server_pic: image,
            default_role: default_role
        }
        if (!errors.length) {
            await dispatch(uploadServerPicThunk(serverPayload))
            console.log("!!!!!reaches here")
            setImage(currentServer.server_pic)
            setHasSubmitted(false)
            hideForm();
        }
    }
    const resetPayload = () => {
        setName(currentServer?.name)
        setServer_pic(currentServer?.server_pic)
        setDefault_role(currentServer?.default_role)

    }

    const handleCancel = () => {
        hideForm();
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return(
        <div className='edit-server-container'>
            <h1>Server Overview</h1>
            <div>
                {hasSubmitted && errors &&
                    <div id='error-msg'>
                        {errors.map((error, ind) => (
                            <div key={ind} style={{ color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                        ))}
                    </div>
                }
            </div>
            <form onSubmit={handleCreate}>
                <div>
                    <div>SERVER NAME</div>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <div>Upload Picture for Your Server</div>
                    <input
                        className="upload-pic-input"
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                </div>
                <div>
                    <div>Set a Default Role for Your Members!</div>
                    <input
                        placeholder='Role Name'
                        type='text'
                        value={default_role}
                        onChange={(e) => setDefault_role(e.target.value)}
                    />
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
    )
}

export default EditServerForm