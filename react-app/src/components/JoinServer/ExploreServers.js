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
    const [joined, setJoined] = useState(false)
    // console.log(sessionUser)
    const allServers = Object.values(useSelector(state => state.serverState))
    const userJoinedServersArr = Object.values(sessionUser.userJoinedServers)
    const userOwnedServer = allServers.filter(server => server.user_id == +sessionUser.id)

    


    useEffect(() => {
        dispatch(getAllServersThunk())
    }, [sessionUser.id]);


    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, []);

    console.log("THIS IS USER IN EXPLORE SERVERS", users)
    // useEffect(() => {
    //     if(joinedServerIds.includes(serverId) || ownedServerIds.includes(serverId)){
    //         setJoined(true)
    //     }
        
    //     },[joined])

    return(
        <>
            <div style={{
                width:"90vw",
                height:"500px",
                marginLeft:"50px",
                backgroundImage:`url(${exploreBackground})`,
                backgroundSize:'cover',
                }}>
                    <h1 className="explore-server-quote">Click server to join today!</h1>
            </div>
                {allServers && 
                    <div className="server-listings-container">
                        {
                            allServers.map(server => (
                                <>
                                    { server.user_id !== sessionUser.id && 
                                    <NavLink to={`/servers/${server.id}/join`}>
                                        <div className="server-listing" key={server.id} >
                                                <img src={server.server_pic}></img>
                                                <p>✅ Server Id: {server.id}</p>
                                                <p> {server.name}</p>
                                                {/* { joined?? 
                                                    <div style={{color:"grey"}}>Already Joined!</div> 
                                                    // : <JoinServerForm currentServerId={server.id}/>
                                                    : <NavLink to={`/servers/${server.id}/join`}>Join</NavLink>

                                                } */}
                                        </div>
                                    </NavLink>}
                                </>
                            ))

                        }
                    
            
                 </div>
                }
        </>
    )
}

export default ExploreServers