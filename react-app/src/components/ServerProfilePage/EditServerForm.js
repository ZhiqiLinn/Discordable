import { getAllServersThunk, getServerThunk } from '../../store/server';

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams,  } from 'react-router-dom'
import { editServerThunk } from '../../store/server';


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
    //------------------CALL SERVERS AGAIN------------------------
    
    useEffect(() => {
            dispatch(getAllServersThunk())
    },[dispatch, serverId])

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const serverPayload = {
            id:serverId,
            user_id: sessionUser.id,
            name: name,
            server_pic: server_pic,
            default_role: default_role
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

    }

    const handleCancel = () => {
        hideForm();
    }
    return(
        <div >
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
                        type='text'
                        value={server_pic}
                        onChange={(e) => setServer_pic(e.target.value)}
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
                    <button className='btn' type='button' onClick={handleCancel}>Cancel</button>
                    <button className='btn' type='button' onClick={resetPayload}>Reset</button>
                    <button className='btn' type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditServerForm