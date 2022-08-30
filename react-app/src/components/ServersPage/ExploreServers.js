import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { NavLink } from "react-router-dom"
import { getAllServersThunk } from "../../store/server";
import './ExploreServers.css'
import exploreBackground from './exploreBackground.jpg'

const ExploreServers = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [users, setUsers] = useState({});
    // console.log(sessionUser)
    const allServers = Object.values(useSelector(state => state.serverState))

    


    useEffect(() => {
        dispatch(getAllServersThunk())
    }, [dispatch, sessionUser.id]);


    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, []);


    return(
        <div>
            <div style={{
                width:"89vw",
                height:"600px",
                marginLeft:"100px",
                marginTop:"30px",
                backgroundImage:`url(${exploreBackground})`,
                backgroundSize:'cover',
                backgroundPostion:'center center',
                borderRadius:'10px'
                }}>
                    <h1 className="explore-server-quote">Click server to join today!</h1>
            </div>
                {allServers && 
                    <div className="server-listings-container">
                        {
                            allServers.map(server => (
                                <>
                                    { server.user_id !== sessionUser.id && 
                                    <NavLink to={`/servers/${server.id}/join`}
                                        style={{textDecoration:"none"}}>
                                        <div className="server-listing" key={server.id} >
                                                <img src={server.server_pic} alt={server.name}></img>
                                                <p className="explore-server-name"> ✅ {server.name}</p>
                                                <p > Server Id: {server.id}</p>
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
        </div>
    )
}

export default ExploreServers