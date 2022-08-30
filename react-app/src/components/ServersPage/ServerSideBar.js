import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { useHistory, useParams} from 'react-router-dom';

import { getAllServersThunk } from "../../store/server";
import CreateServerLiveModal from "../CreateServerLiveModal"
import logo from "./logo.png"
import UserJoinedServerList from "./UserJoinedServerList";
import "./ServersPage.css"


const ServerSideBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const allServersArr = Object.values(useSelector(state => state.serverState))
    const userOwnedServer = allServersArr.filter(server => server.user_id == +sessionUser.id)
    

    useEffect(()=> {
        dispatch(getAllServersThunk())
    },[])
    

    return(
        <div >
            <div className="server-sidebar-container">
                <div className="server-sidebar-logo">
                    <NavLink to={`/`}>
                        <img src={logo}></img>
                    </NavLink>  
                </div>
                {userOwnedServer.map(server => (
                    <div key={server.id}>
                        <NavLink to={`/servers/${server.id}`}>
                            <img className="server-sidebar-round-img" src={server.server_pic} alt={server.name}>
                            </img>
                        </NavLink>
                    </div>
                ))}
                <UserJoinedServerList />
                <CreateServerLiveModal />
                <div>
                    <button className="explore-server-btn" onClick={()=> history.push('/servers')}> <i class="fa-solid fa-compass" style={{cursor:"pointer"}}></i> </button>
                </div>

            </div>

        </div>
        
    )
}

export default ServerSideBar