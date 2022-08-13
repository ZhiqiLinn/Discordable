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
        let messageArr = message.split(' ').join('')
        if (messageArr.length < 1 || messageArr.length > 500) errors.push("Message length between 0 - 500 charatcers, not include whitespace, message shouldn't include only whitespace.")
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
        let newMsg;
        if (!errors.length) {
            newMsg = await dispatch(addMessageThunk(msgPayload))
            reset();
            setHasSubmitted(false);
            history.push(`/servers/${serverId}/${chanId}`);
        }
    }

    const reset = () => {
        setMessage('');
    }
    return(
        <form onSubmit={handleCreate}>
            <div className="create-msg-container">
                {hasSubmitted && errors &&
                <div id='error-msg'>
                    {errors.map((error, ind) => (
                        <div key={ind} style={{ color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                    ))}
                </div>
                }
                <div className="input-div">
                    <input
                        placeholder={`   Message # ${findChanInfo(chanId)?.name}`}
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        
                    <button  type="submit" className="send-msg-btn">Send</button>

                </div>
                </div>
            </form>
    )
}
export default CreateMessageBar