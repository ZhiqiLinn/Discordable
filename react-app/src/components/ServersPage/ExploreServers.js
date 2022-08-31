import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { NavLink } from "react-router-dom"
import { getAllServersThunk } from "../../store/server";
import './ExploreServers.css'
import exploreBackground from './images/exploreBackground.jpg'
import SearchBar from "./SearchBar";
import ServerSideBar from "./ServerSideBar";
import ExploreFilterBar from "./ExploreFilterBar";

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
        <div className="server-page-layout">
            <ServerSideBar />
            <ExploreFilterBar />
            <div className="explore-container">

                <div classNamr="explore-background"
                    style={{
                        width:"100%",
                        height:"600px",
                        margin:"5%",
                        backgroundImage:`url(${exploreBackground})`,
                        backgroundSize:'cover',
                        backgroundPostion:'center center',
                        borderRadius:'10px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                }}>
                        <SearchBar allServers={allServers}/>
                </div>
                <div style={{marginLeft:"5%"}}>
                    <h3>Popular Communities</h3>
                </div>
                <div className="server-listings-container">

                    {allServers &&
                        <>
                            {
                                allServers.map(server => (
                                    <>
                                        { server.user_id !== sessionUser.id && 
                                        <div className="server-single-listing">

                                            <NavLink to={`/servers/${server.id}/join`}
                                                style={{textDecoration:"none", color:'white'}}>
                                                        <img className="server-listing-img" src={server.explore_pic} alt={server.name}></img>
                                                        <div className="explore-server-intro">
                                                            <h4 > ✅ {server.name}</h4>
                                                            <p className="explore-server-description">{server.description}</p>
   
                                                        </div>
                                            </NavLink>
                                        </div>
                                        }
                                    </>
                                ))

                            }
                        </> 
                        }
                </div>
            </div>
        </div>
    )
}

export default ExploreServers