import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { useParams, useHistory, NavLink } from "react-router-dom"
import { getAllServersThunk } from "../../store/server";
import './ExploreServers.css'
import JoinServerForm from "./JoinServerForm";
import exploreBackground from './exploreBackground.jpg'

const ExploreServers = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [users, setUsers] = useState({});
    // console.log(sessionUser)
    const allServers = Object.values(useSelector(state => state.serverState))

    useEffect(() => {
        dispatch(getAllServersThunk())
    }, []);


    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, []);

    const userJoinedServersArr = Object.values(sessionUser.userJoinedServers)
    const userOwnedServer = allServers.filter(server => server.user_id == +sessionUser.id)
    const joinedServerIds = userJoinedServersArr.map(server => server.joinedServer_id)
    const ownedServerIds = userOwnedServer.map(server => server.id)

    
    const joinedCheck = (serverId) => {
        if(joinedServerIds.includes(serverId) || ownedServerIds.includes(serverId)){
            return true
        }
    }
    return(
        <>
            <div style={{
                width:"90vw",
                height:"500px",
                marginLeft:"50px",
                backgroundImage:`url(${exploreBackground})`,
                backgroundSize:'cover',
                }}>
                    <h1 className="explore-server-quote">Explore Servers!</h1>
            </div>
            <div className="server-listings-container">
                {allServers && 
                    allServers.map(server => (
                        <div className="server-listing" key={server.id} >
                                <img src={server.server_pic}></img>
                                <p>✅ Server Id: {server.id}</p>
                                <p> {server.name}</p>
                                { joinedCheck(server.id) ? 
                                    <div style={{color:"grey"}}>Already Joined!</div> 
                                    : <JoinServerForm currentServerId={server.id}/>
                                    
                                }
                        </div>
                    ))
                    
            
                }
            </div>
        </>
    )
}

export default ExploreServers