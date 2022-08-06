import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {joinAServerThunk} from '../../store/joinedServer';

function JoinServerForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [serverId, setServerId] = useState("")
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        let errors = []
        if (!serverId) errors.push("Please enter server link");
        setErrors(errors);
    }, [serverId]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const payload = {
            member_id:sessionUser.id,
            server_id:serverId
        }
        const newServer = await dispatch(joinAServerThunk(payload))
        if (newServer && !errors.length) {
            reset();
            setHasSubmitted(false)
            history.push(`/servers/${serverId}`)
        }
    }
    const reset = () => {
        setServerId('')
    }


    return(
        <div >
            <h1>Join a Server</h1>
            <div>
                {hasSubmitted && errors &&
                    <div >
                        {errors.map((error, idx) => <div key={idx}> * {error}</div>)}
                    </div>
                }
            </div>
            <form onSubmit={handleCreate}>
                <div>
                    <div>INIVITE LINK *</div>
                    <input
                        placeholder='Please enter server ID'
                        type='text'
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>Join</button>
                </div>
            </form>

        </div>
    )
}

export default JoinServerForm