import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { getAllServersThunk } from "../../store/server";
import CreateServerLiveModal from "../CreateServerLiveModal"
import LogoutButton from "../auth/LogoutButton"

const ServerSideBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const allServersArr = Object.values(useSelector(state => state.serverState.allServers))
    const userOwnerServer = allServersArr.filter(server => server.user_id == +sessionUser.id)
    const userJoinedServersArr = Object.values(sessionUser.userJoinedServers)

    
    // console.log(userServers)
    // useEffect(() => {
    //     setJoinedServers(sessionUser.userJoinedServers)
    //     // if(joinedServers){
    //     //     console.log("####### joined server arr", Object.values(joinedServers))
    //     //     setJoinedServersArr(Object.values(joinedServers))
    //     // }
    // },[sessionUser, joinedServers])

    // console.log("####### joined server", joinedServers)
    // console.log("####### joined server sessionuser", sessionUser)


    useEffect(()=> {
        dispatch(getAllServersThunk())
    },[sessionUser.userJoinedServers])

    return(
        <div className="server-sidebar-container">
            {userOwnerServer.map(server => (
                <div key={server.id}>
                    <NavLink to={`/servers/${server.id}`}>
                        <img className="server-sidebar-round-img" src={server.server_pic} alt={server.name}>
                        </img>
                    </NavLink>
                </div>
            ))}
            {userJoinedServersArr.map(server => (
                <div key={server.id}>
                <NavLink to={`/servers/${server.joinedServer_id}`}>
                    <img className="server-sidebar-round-img" src={server.joinedServer_server_pic} alt={server.joinedServer_name}>
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