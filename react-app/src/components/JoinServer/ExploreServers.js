import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";
import { useParams, useHistory, NavLink } from "react-router-dom"
import { getAllServersThunk } from "../../store/server";
import './ExploreServers.css'
import JoinServerForm from "./JoinServerForm";

const ExploreServers = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const AllServers = Object.values(useSelector(state => state.serverState))

    useEffect(() => {
        dispatch(getAllServersThunk())
    }, []);

    console.log("all servers", AllServers)


    return(
        <div className="server-listings-container">
            {AllServers && 
                AllServers.map(server => (
                    <div className="server-listing" key={server.id} >
                            <img src={server.server_pic}></img>
                            <p>✅ Server Id: {server.id}</p>
                            <p> {server.name}</p>
                            <JoinServerForm currentServerId={server.id}/>
                            {/* {showModal && (
                                <div>
                                    <Modal onClose={() => setShowModal(false)}>
                                        <JoinServerForm currentServerId={server.id}/>
                                    </Modal>
                                </div>
                            )} */}
                    </div>
                ))
                
        
            }
        </div>
    )
}

export default ExploreServers