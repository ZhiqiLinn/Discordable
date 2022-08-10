import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CreateChannelLiveModal from "../CreateChannelLiveModal";
import DeleteChannelLiveModal from "../DeleteChannelLiveModal/DeleteChannelLiveModal";
import EditChannelLiveModal from "../EditChannelLiveModal"
import './ChannelsSection.css'
import { getAllChannelsByServerThunk } from "../../store/channel";
import { getAllServersThunk, getServerThunk } from "../../store/server";
import UserProfileBar from "../UserProfile/UserProfileBar";

const ChannelsSection = () => {
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.serverState[serverId])
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const AllChannels = Object.values(useSelector(state => state.channelState.serverChannels))
    const [currChannel, setCurrChannel] = useState(AllChannels[0]?.id)

    useEffect(() => {
        dispatch(getAllChannelsByServerThunk(serverId))
    },[dispatch, serverId])
    
    let editProfileLink;
    if(sessionUser.id === currentServer?.user_id){
        editProfileLink = (
            <div>
                <NavLink to={`/servers/${serverId}/profile`}  style={{ textDecoration: 'none', color: 'White' }}>
                    <div className="server-profile-container">
                        {currentServer?.name} 
                    </div>
                </NavLink>
            </div>
        )
    }else{
        editProfileLink = (
            <div className="server-profile-container">
                {currentServer?.name} 
            </div>
        )
    }
    return (
        <>
                { currentServer && <div className="channel-section-container"> 
                    <div>
                        {editProfileLink}
                    </div>
                    <div>
                        <CreateChannelLiveModal sessionUser={sessionUser}/>
                    </div>
                    <div>
                    {AllChannels.map(channel => (
                        <div key={channel.id}>
                            <div  className={currChannel === channel.id ? " channels selected-channel" : "channels"}>
                                <NavLink 
                                    style={{ textDecoration: 'none', color: 'rgb(195, 194, 194)', fontSize:'14px', fontWeight:'light' }} 
                                    to={`/servers/${channel.server_id}/${channel.id}`} 
                                    onClick={() => setCurrChannel(channel.id)}
                                    >
                                        { channel.name.length > 15 && 
                                            <>
                                            <i className="fa-solid fa-hashtag"></i> { `${channel.name.slice(0,15)}...`}
                                            </>
                                            
                                        }
                                        { channel.name.length <= 15 && 
                                            <>
                                            <i className="fa-solid fa-hashtag"></i> {channel.name}
                                            </>
                                            
                                        }
                                    
                                </NavLink>
                                {sessionUser.id === currentServer.user_id && currChannel === channel.id && 
                                    <>
                                        <EditChannelLiveModal channel={channel} />
                                        <DeleteChannelLiveModal />
                                    </>

                                }
                            </div>
                        </div>
                    ))
                    }   
                    </div>
                    <div className="channel-user-logout-container">
                        <UserProfileBar />
                    </div>
                </div>
            }   
        </>
    )
}

export default ChannelsSection