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
        if (name.length >= 50) errors.push("Name length invalid and should be less than 50 characters");
        setErrors(errors);
    }, [name]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const serverPayload = {
            user_id: sessionUser.id,
            name,
            server_pic,
            default_role
        }
        const newServer = await dispatch(addServerThunk(serverPayload))
        if (newServer && !errors.length) {
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
                {hasSubmitted && errors &&
                    <div >
                        {errors.map((error, idx) => <div key={idx}> * {error}</div>)}
                    </div>
                }
            </div>
            <form onSubmit={handleCreate}>
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
                    <NavLink to='/explore-server'>
                        Join a Server
                    </NavLink>
                </div>
        </div>
    )
}

export default CreateServerForm