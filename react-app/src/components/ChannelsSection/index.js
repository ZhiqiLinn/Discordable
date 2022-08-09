import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CreateChannelLiveModal from "../CreateChannelLiveModal";
import DeleteChannelLiveModal from "../DeleteChannelLiveModal";
import EditChannelLiveModal from "../EditChannelLiveModal"
import './ChannelsSection.css'
import { getAllChannelsByServerThunk } from "../../store/channel";
import { getServerThunk } from "../../store/server";

const ChannelsSection = () => {
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.serverState[serverId])
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const AllChannels = Object.values(useSelector(state => state.channelState.serverChannels))
    const [currChannel, setCurrChannel] = useState(AllChannels[0]?.id)

    useEffect(() => {
        dispatch(getServerThunk(serverId))
        dispatch(getAllChannelsByServerThunk(serverId))
    },[dispatch, serverId])
    
    return (
        <>
                { currentServer && <div className="channel-section-container"> 
                    <div>
                        <NavLink to={`/servers/${serverId}/profile`}  style={{ textDecoration: 'none', color: 'White' }}>
                            <div className="server-profile-container">
                                {currentServer?.name} 
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <CreateChannelLiveModal />
                    </div>
                    <div>
                    {AllChannels.map(channel => (
                        <>
                            <div className={currChannel === channel.id ? " channels selected-channel" : "channels"}>
                                <NavLink 
                                    style={{ textDecoration: 'none', color: 'rgb(195, 194, 194)', fontSize:'small', fontWeight:'light' }} 
                                    to={`/servers/${channel.server_id}/${channel.id}`} 
                                    onClick={() => setCurrChannel(channel.id)}
                                    >
                                        { channel.name.length > 11 && 
                                            <>
                                            # { `${channel.name.slice(0,11)}...`}
                                            </>
                                            
                                        }
                                        { channel.name.length <= 11 && 
                                            <>
                                            # {channel.name}
                                            </>
                                            
                                        }
                                    
                                </NavLink>
                                {sessionUser.id === currentServer.user_id && currChannel === channel.id && 
                                    <>
                                        <EditChannelLiveModal channel={channel} />
                                        <DeleteChannelLiveModal channelId={channel.id}/>
                                    </>

                                }
                            </div>
                        </>
                    ))
                    }   
                    </div>

                </div>
            }   
        </>
    )
}

export default ChannelsSection