import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import ChannelsSection from "../ChannelsSection";

import './ServerDetail.css'
import ServerSideBar from "../ServersPage/ServerSideBar";
import { getServerThunk } from "../../store/server";

const ServerDetailPage = () => {
    const dispatch = useDispatch()
    const {serverId} = useParams()
    const currentServer = useSelector(state => state.serverState[serverId])

    useEffect(() => {
        dispatch(getServerThunk(serverId))
    }, []);

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
                </div>
            }
        </>
    )
}

export default ServerDetailPage