import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { editChannelThunk } from '../../store/channel';
import "./EditChannel.css"
const EditChannelForm = ({channel, hideForm}) => {
    const {serverId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const [name, setName] = useState(channel.name)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let errors = []
        if (!name.length) errors.push("Please enter a channel name!")
        setErrors(errors);
    }, [name]);

    const handleEdit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const channelPayload = {
            id: channel.id,
            user_id: sessionUser.id,
            name,
            server_id: serverId

        }
        const newChannel = await dispatch(editChannelThunk(channelPayload))
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
        <div className='edit-channel-modal'>
            <h1>Edit Channel</h1>
            <div>
                {hasSubmitted && errors &&
                    <div id='error-msg'>
                    {errors.map((error, ind) => (
                        <div key={ind} style={{ color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                    ))}
                    </div>
                }
            </div>
            <form onSubmit={handleEdit}>
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
                    <button className='btn' type="submit">Edit Channel</button>
                    <br></br>
                    <button className='btn' type='button' onClick={() =>hideForm()}>Cancel</button>
                    
                </div>
            </form>
        </div>
    )
}

export default EditChannelForm