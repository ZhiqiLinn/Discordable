import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import { addServerThunk } from '../../store/server';

function CreateServerForm({hideForm}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [name, setName] = useState("")
    const [server_pic, setServer_pic] = useState("")
    const [default_role, setDefault_role] = useState("")
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let errors = []
        if (name.length < 3 || name.length > 50) errors.push("Name length should be between 3 and 50 characters")
        if (!/https?:\/\/.*\.(?:png|jpg)/.test(server_pic)) errors.push("Image URL invalid");
        // if (default_role.length < 3 || default_role.length > 10) errors.push("role title length should be between 3 and 10 characters")
        setErrors(errors);
    }, [name, server_pic]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const serverPayload = {
            user_id: sessionUser.id,
            name,
            server_pic,
            default_role
        }
        let newServer;
        if (!errors.length) {
            newServer = await dispatch(addServerThunk(serverPayload))
            reset();
            setHasSubmitted(false)
            hideForm();
            history.push(`/servers`)
        }
    }
    const reset = () => {
        setName('');
        setServer_pic('');
    }

    return(
        <div >
            <h1>Customize Your Server</h1>
            <div>
            </div>
            <form onSubmit={handleCreate}>
                    {hasSubmitted && errors &&
                    <div id='error-msg'>
                    {errors.map((error, ind) => (
                        <div key={ind} style={{color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                    ))}
                    </div>
                    }
                <div>
                    <div>Server Name</div>
                    <input
                        placeholder='Server Name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <div>Upload Picture for Your Server</div>
                    <input
                        placeholder='Image URL'
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
                    <button id='next-button' type="submit">Create</button>
                    <button type='button' onClick={() => history.goBack()}>Cancel</button>
                </div>
            </form>
                <div>
                    <NavLink to='/servers/join'>
                        Join a Server
                    </NavLink>
                </div>
        </div>
    )
}

export default CreateServerForm