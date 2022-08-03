import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { getAllServersThunk } from "../../store/server";
import CreateServerLiveModal from "../CreateServerLiveModal"
import LogoutButton from "../auth/LogoutButton"

const ServerSideBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const allServersArr = Object.values(useSelector(state => state.serverState))
    const userOwnerServer = allServersArr.filter(server => server.user_id == +sessionUser.id)
    console.log("USER'S OWN SERVER", userOwnerServer)
    useEffect(()=> {
        dispatch(getAllServersThunk())
    },[])
    return(
        <div className="server-side-bar-container">
            {userOwnerServer.map(server => (
                <div>
                    <NavLink to={`/servers/${server.id}`}>
                        <img width="100px" height="100px" src={server.server_pic} alt={server.name}>
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