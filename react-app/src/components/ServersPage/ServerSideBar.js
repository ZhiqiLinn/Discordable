import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { getAllServersThunk } from "../../store/server";
import CreateServerLiveModal from "../CreateServerLiveModal"
import LogoutButton from "../auth/LogoutButton"
import { getAllChannelsThunk } from "../../store/channel";

const ServerSideBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const allServersArr = Object.values(useSelector(state => state.serverState))
    const userOwnerServer = allServersArr.filter(server => server.user_id == +sessionUser.id)
    const allChannelsArr = Object.values(useSelector(state => state.channelState))

    useEffect(()=> {
        dispatch(getAllServersThunk())
        dispatch(getAllChannelsThunk())
    },[])
    return(
        <div className="server-sidebar-container">
            {userOwnerServer.map(server => (
                <div>
                    <NavLink to={`/servers/${server.id}`}>
                        <img className="server-sidebar-round-img" src={server.server_pic} alt={server.name}>
                        </img>
                    </NavLink>
                </div>
            ))}
            <CreateServerLiveModal />
            <LogoutButton />
            

        </div>
        
    )
}

export default ServerSideBar