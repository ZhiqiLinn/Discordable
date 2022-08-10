import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteServerThunk } from "../../store/server";


const DeleteServerForm = ({serverId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteSubmit = () => {
        dispatch(deleteServerThunk(serverId));
        history.push('/servers');

    }
    return (
        <div >
            <h1>DO YOU REALLY WANNA DELETE THIS SERVER???</h1>
            <div >
                <button onClick={() => history.push(`/servers/${serverId}`)}>Cancel</button>
                <button onClick={handleDeleteSubmit}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteServerForm;