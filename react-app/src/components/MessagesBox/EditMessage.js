import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { getAllChannelsByServerThunk } from "../../store/channel";
import { useParams, useHistory } from "react-router-dom"
import { editMessageThunk } from "../../store/messages";
import { SmallModal } from '../../context/SmallModal';

import './MessagesBox.css'
const EditMessage = ({msgId}) => {
    const {serverId, chanId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const AllChannels = Object.values(useSelector(state => state.channelState.serverChannels))
    const currMsg = useSelector(state => state.messageState[msgId])
    console.log('currMsg', currMsg)
    const [message, setMessage] = useState(currMsg.message)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [showModal, setShowModal] = useState(false);

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
        <span  onClick={() => setShowModal(true)}> <i className="fa-solid fa-pen" style={{cursor:"pointer"}}></i> </span>
            {showModal && (
                <div>
                    <SmallModal onClose={() => setShowModal(false)}>
                        <div className="edit-message-modal">
                            <h2>Modify Message</h2>
                            <form onSubmit={handleCreate}>
                                {hasSubmitted && errors &&
                                <div id='error-msg'>
                                    {errors.map((error, ind) => (
                                    <div key={ind} style={{ color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                                    ))}
                                </div>
                                }
                                <div>
                                    <textarea
                                        placeholder={`   Message # ${findChanInfo(chanId)?.name}`}
                                        type='text'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button className="btn" type="submit">Save Changes</button>
                                    <br></br>
                                    <button className="btn" type="submit" onClick={()=> setShowModal(false)}>Cancel</button>

                                </div>
                            </form>
                        </div>
                    </SmallModal>
        </div>
    )}
    </>
)
}
export default EditMessage