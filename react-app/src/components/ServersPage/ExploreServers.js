import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { NavLink } from "react-router-dom"
import { getAllServersThunk } from "../../store/server";
import './ExploreServers.css'
import exploreBackground from './images/exploreBackground.jpg'
import SearchBar from "./SearchBar";
import ServerSideBar from "./ServerSideBar";
import UserProfileBar from "../UserProfile/UserProfileBar";

const ExploreServers = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [users, setUsers] = useState({});
    const [category, setCategory] = useState("")
    const [home, setHome] = useState(true)
    const allServers = Object.values(useSelector(state => state.serverState))
    const categorySelections = [{'name':'Gaming', 'icon':'gamepad'},
                                 {'name':'Music','icon':'music'},
                                {'name': 'Education','icon':'graduation-cap'} ,
                                {'name':'Science & Tech','icon':'flask'},
                                 {'name':'Entertainment','icon':'tv'} 
                            ]

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
            <div className="explore-filterbar-container">
                <h1 style={{padding:"7%"}}> Discover</h1>
                <div>
                    <div>
                        <div 
                            className={home ? "category-button selected-category" : "category-button"}
                            onClick={()=> {
                                setCategory()
                                setHome(true)
                            }}
                            ><i className="fa-solid fa-compass btn-space"></i>Home</div>
                    </div>
                    {categorySelections.map(cate => (
                        <div 
                            className={category === cate.name ? "category-button selected-category" : "category-button"}
                            onClick={()=> {
                                setCategory(cate.name)
                                setHome(false)
                            }}
                            >
                                <div>
                                    <i className={`fa-solid fa-${cate.icon} btn-space`}> </i>
                                </div>
                                <div className="category-name">
                                    {cate.name}
                                </div>
                        </div>
                    ))
                    }   
                </div>
                <div className="channel-user-logout-container">
                    <UserProfileBar />
                </div>
            </div>



            <div className="explore-container">
                <div className="explore-background"
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
                    <h3>Communities:</h3>
                </div>
                <div className="server-listings-container">

                    {allServers &&
                        <>
                            {   home && 
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
                            
                            
                            {   !home && 
                                allServers.map(server => (
                                    <>
                                        { category === server.category && server.user_id !== sessionUser.id && 
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