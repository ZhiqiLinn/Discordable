import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteChannelThunk } from "../../store/channel";


const DeleteChannelForm = ({channelId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log("THIS IS DELETED CHANNEL ID", channelId)

    const handleDeleteSubmit = () => {
        dispatch(deleteChannelThunk(channelId));
        history.push('/servers');

    }
    return (
        <div >
            <h1>DO YOU REALLY WANNA DELETE THIS CHANNEL???</h1>
            <div >
                <button onClick={() => history.push(`/servers`)}>Cancel</button>
                <button onClick={handleDeleteSubmit}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteChannelForm;