import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getServerThunk } from "../../store/server";
import ChannelsSection from "../ChannelsSection";
import ServerSideBar from "../ServersPage/ServerSideBar";
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
                        <p>Please select your channel!</p>
                        <a href='/'>How to user Discordable</a>
                    </div>
                    <div>
                        <div>
                            {currentServer.default_role}:
                            <hr></hr>
                        <div>
                            * {currentServer.owner.username}
                        </div>
                            { serverMembersArr && serverMembersArr.map((member, index) => (
                                <p key={index}>{member.member_username}</p>
                            ))}
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default ServerDetailPage