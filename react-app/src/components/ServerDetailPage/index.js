import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { getServerThunk } from "../../store/server";
import ChannelsSection from "../ChannelsSection";
import ServerSideBar from "../ServersPage/ServerSideBar";
import MemberList from "./MemberList";
import './ServerDetail.css'

const ServerDetailPage = () => {
    const dispatch = useDispatch()
    const {serverId} = useParams()
    const [serverMembers, setServerMembers] = useState({})
    const [serverMembersArr, setServerMembersArr] = useState([])
    const servers = useSelector(state => state.serverState)
    const currentServer = servers[parseInt(serverId)]
    // console.log("!!!!!!THIS IS CURRRENT SERVER",currentServer)
    
    // console.log("!!!!!!!!!tHIS IS CURRENT SERVER'S MEMBER LIST", serverMembersArr)

    useEffect(() => {
        dispatch(getServerThunk(serverId))
    }, [dispatch, serverId]);

    useEffect(() => {
        setServerMembers(currentServer?.serverMembers)
        if(serverMembers){
            setServerMembersArr(Object.values(serverMembers))
        }
    },[currentServer])


    return(
        <>
            {currentServer && 
                <div className="server-page-layout">
                    <ServerSideBar />
                    <div  >

                        <ChannelsSection />
                    </div> 
                    <div className="server-intro">
                        <h1>Welcome to {currentServer.name}</h1>
                        <p>This is your shiny server!! Please select a channel to start the chat. For guide on how to use discordable, click below: </p>
                        <a target="_blank" href='https://github.com/ZhiqiLinn/Discordable/wiki/HOW-TO-USE-DISCORDABLE'>Getting Started Guide</a>
                    </div>
                    <div>
                        <MemberList />
                    </div>

                </div>
            }
        </>
    )
}

export default ServerDetailPage