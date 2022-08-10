import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { useHistory, useParams} from 'react-router-dom';

import { getAllServersThunk } from "../../store/server";
import CreateServerLiveModal from "../CreateServerLiveModal"
import LogoutButton from "../auth/LogoutButton"
import logo from "./logo.png"
import { GetAllJoinedServerThunk } from "../../store/joinedServer";
import UserJoinedServerList from "./UserJoinedServerList";
const ServerSideBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const allServersArr = Object.values(useSelector(state => state.serverState))
    const userOwnedServer = allServersArr.filter(server => server.user_id == +sessionUser.id)
    
    
    // const [users, setUsers] = useState([]);
    
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/users/');
    //         const responseData = await response.json();
    //         setUsers(responseData.users);
    //     }
    //     fetchData();
    // }, []);

    // console.log("users:", users)
    // const [joinedServers, setJoinedServers] = useState({})
    // const [joinedServersArr, setJoinedServersArr] = useState([])
    // // console.log(userServers)
    // useEffect(() => {
    //     setJoinedServers(sessionUser?.userJoinedServers)
    //     if(joinedServers){
    //         setJoinedServersArr(Object.values(joinedServers))
    //     }
    // },[sessionUser])

    // console.log("####### joined server", joinedServersArr)
    // console.log("####### joined server sessionuser", sessionUser)


    useEffect(()=> {
        dispatch(getAllServersThunk())
    },[])
    

    return(
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
                <button className="explore-server-btn" onClick={()=> history.push('/servers')}> <i class="fa-solid fa-compass"></i> </button>
            </div>

        </div>
        
    )
}

export default ServerSideBar