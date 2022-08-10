import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { getAllChannelsByServerThunk } from "../../store/channel";
import { useParams, useHistory } from "react-router-dom"
import { editMessageThunk } from "../../store/messages";
import { MsgModal } from '../../context/MsgModal';

import './MessagesBox.css'
const EditMessage = ({msgId}) => {
    const {serverId, chanId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const AllChannels = Object.values(useSelector(state => state.channelState.serverChannels))
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [showModal, setShowModal] = useState(false);

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
            id:msgId,
            user_id: sessionUser.id,
            message: message,
            channel_id: chanId,
            created_at: new Date()
        }
        if (!errors.length) {
            await dispatch(editMessageThunk(msgPayload))
            reset();
            setShowModal(false)
            setHasSubmitted(false);
            history.push(`/servers/${serverId}/${chanId}`);
        }
    }

    const reset = () => {
        setMessage('');
    }
    return(
        <>
        <span  onClick={() => setShowModal(true)}> <i className="fa-solid fa-pen"></i> </span>
            {showModal && (
                <div>
                    <MsgModal onClose={() => setShowModal(false)}>
                        <div>
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
                    </MsgModal>
        </div>
    )}
    </>
)
}
export default EditMessage