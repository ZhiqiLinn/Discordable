import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom'
import { quitAServerThunk } from "../../store/joinedServer";


const QuitServer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {serverId } = useParams()
    const sessionUser = useSelector(state => state.session.user);

    const handleQuit = async (e) => {
        e.preventDefault()
        const payload = {
            server_id:serverId,
            member_id:sessionUser.id
        }
        await dispatch(quitAServerThunk(payload))
        history.push(`/servers`);

    }

    return(
        <div >
        <h1>DO YOU REALLY WANNA QUIT THIS SERVER???</h1>
        <div >
            <button onClick={handleQuit}>Delete</button>
        </div>
    </div>
    )
}

export default QuitServer