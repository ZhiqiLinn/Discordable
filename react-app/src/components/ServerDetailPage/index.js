import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getServerThunk } from "../../store/server";
import ChannelsSection from "../ChannelsSection";
import ServerSideBar from "../ServersPage/ServerSideBar";
import MemberList from "./MemberList";
import './ServerDetail.css'

const ServerDetailPage = () => {
    const dispatch = useDispatch()
    const {serverId} = useParams()
    const servers = useSelector(state => state.serverState.singleServer)
    const currentServer = servers[parseInt(serverId)]
    console.log("!!!!!!THIS IS CURRRENT SERVER",currentServer)
    // const currServerMembers = Object.values(currentServer.serverMembers)
    // console.log("!!!!!!!!!tHIS IS CURRENT SERVER'S MEMBER LIST", currServerMembers)

    useEffect(() => {
        dispatch(getServerThunk(serverId))
    }, [dispatch, serverId]);

    return(
        <>
            {currentServer && 
                <div className="server-page-layout">
                    <ServerSideBar />
                    <div className="channel-section-container" >

                        <ChannelsSection serverId={serverId} currentServer={currentServer}/>
                    </div> 
                    <div>
                        Welcome to server{currentServer.name}
                    </div>
                    <div>
                        {currentServer.default_role}:
                        <hr></hr>
                        <div>
                            * {currentServer.owner.username}
                        </div>
                        {/* { currServerMembers &&
                           <div>
                            { currServerMembers.map( member => (
                                <p>{member.username}</p>
                            ))}
                            </div>
                        } */}
                    </div>
                </div>
            }
        </>
    )
}

export default ServerDetailPage