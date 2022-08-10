
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import DeleteServerForm from './DeleteServerForm';
import ServerOverviewPage from './ServerOverviewPage';


const ServerProfilePage = () => {
    // const history = useHistory();
    // const dispatch = useDispatch();
    const {serverId} = useParams()
    const allServersArr = Object.values(useSelector(state => state.serverState))
    const currentServer = allServersArr.filter(server => server.id === +serverId)[0]

    const [showOverview, setShowOverview] = useState(true)
    const [showRoles, setShowRoles] = useState(false)
    const [showMembers, setShowMembers] = useState(false)
    const [showDeleteServer, setShowDeleteServer] = useState(false)
    //------------------CALL SERVERS AGAIN------------------------

    //------------------HANDLE FUNCTIONs--------------------------
    const openOverview = () => {
        setShowOverview(true)
        setShowRoles(false)
        setShowMembers(false)
        setShowDeleteServer(false)
    }

    const openDeletePage = () => {
        setShowOverview(false)
        setShowRoles(false)
        setShowMembers(false)
        setShowDeleteServer(true)
    }
    return(
        <>
            <div>
                <h4></h4>
                <div>
                    <button onClick={openOverview}>Overview</button>
                </div>

                <div>
                    <button onClick={openDeletePage}>Delete Server 🗑️</button>
                </div>
        
            </div>
            { showOverview && 
                <div>
                    <ServerOverviewPage serverId={serverId} currentServer={currentServer}/>
                </div>
                }
            { showDeleteServer && 
                <div>
                    < DeleteServerForm serverId={serverId}/>
                </div>
                }
        </>
    )
}

export default ServerProfilePage