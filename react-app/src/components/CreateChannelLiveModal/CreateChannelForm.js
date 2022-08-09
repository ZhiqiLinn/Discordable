import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { addChannelThunk } from '../../store/channel';

const CreateChannelForm = ({hideForm}) => {
    const {serverId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let errors = []
        if (name.length < 3 || name.length > 50) errors.push("Name length should be between 3 and 50 characters")
        setErrors(errors);
    }, [name]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const channelPayload = {
            user_id: sessionUser.id,
            name,
            server_id: serverId

        }
        const newChannel = await dispatch(addChannelThunk(channelPayload))
        if (newChannel && !errors.length) {
            reset();
            setHasSubmitted(false);
            hideForm();
            history.push(`/servers/${serverId}`);
        }
    }
    const reset = () => {
        setName('');
    }

    return(
        <div >
            <h1>Create Channel</h1>
            <div>
                {hasSubmitted && errors &&
                    <div >
                        {errors.map((error, idx) => <div key={idx}> * {error}</div>)}
                    </div>
                }
            </div>
            <form onSubmit={handleCreate}>
                <div>
                    <div>CHANNEL NAME</div>
                        <label>
                            #
                            <input
                                placeholder='new-channel'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </label>
                </div>
                <div>
                    <button type='button' onClick={() => history.goBack()}>Cancel</button>
                    <button id='next-button' type="submit">Create Channel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateChannelForm