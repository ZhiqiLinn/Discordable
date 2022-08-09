import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { getAllChannelsByServerThunk } from "../../store/channel";
import { useParams, useHistory } from "react-router-dom"
import { addMessageThunk } from "../../store/messages";
import './MessagesBox.css'
const CreateMessageBar = () => {
    const {serverId, chanId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const AllChannels = Object.values(useSelector(state => state.channelState.serverChannels))
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let errors = []
        if (message.length <=0) errors.push("Please enter your message")
        setErrors(errors);
    }, [message]);

    useEffect(() => {
        dispatch(getAllChannelsByServerThunk(serverId))
    }, [chanId, serverId]);

    const findChanInfo = (chanId) => {
        let result = AllChannels.filter(chan =>  chan.id === +chanId)
        return result[0]
    }
    
    const handleCreate = async(e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const msgPayload = {
            user_id: sessionUser.id,
            message: message,
            channel_id: chanId,
            created_at: new Date()
        }
        const newMsg = await dispatch(addMessageThunk(msgPayload))
        if (newMsg && !errors.length) {
            reset();
            setHasSubmitted(false);
            history.push(`/servers/${serverId}/${chanId}`);
        }
    }

    const reset = () => {
        setMessage('');
    }
    return(
        <div className="create-msg-container">
            <form onSubmit={handleCreate}>
                {hasSubmitted && errors &&
                <div id='error-msg'>
                    {errors.map((error, ind) => (
                    <div key={ind} style={{ color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                    ))}
                </div>
                }
                <div>
                    <input
                        placeholder={`   Message # ${findChanInfo(chanId)?.name}`}
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    
                    <button  type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}
export default CreateMessageBar