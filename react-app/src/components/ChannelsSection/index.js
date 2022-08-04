import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllChannelsThunk } from "../../store/channel";
import CreateChannelLiveModal from "../CreateChannelLiveModal";
import DeleteChannelLiveModal from "../DeleteChannelLiveModal";
import EditChannelLiveModal from "../EditChannelLiveModal"
import ServerSideBar from "../ServersPage/ServerSideBar";
import MessagesBox from "../MessagesBox";
import './ChannelsSection.css'

const ChannelsSection = () => {
    const {serverId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const allServersArr = Object.values(useSelector(state => state.serverState))
    const currentServer = allServersArr.filter(server => server.id == +serverId)[0]
    const allChannelsArr = Object.values(useSelector(state => state.channelState))
    const filteredChannels = allChannelsArr.filter(channel => channel.server_id == +serverId)
    // console.log("!!FILTERED CHANNELS", filteredChannels)
    const [currChannel, setCurrChannel] = useState(filteredChannels[0])

    useEffect(()=> {
        dispatch(getAllChannelsThunk())
    },[])
    return (
        <div className="channel-section-container"> 
            <div>
                <NavLink to={`/servers/${serverId}/profile`}  style={{ textDecoration: 'none', color: 'White' }}>
                    <div className="server-profile-container">
                        {currentServer.name} 
                    </div>
                </NavLink>
            </div>
            <div>
                <CreateChannelLiveModal />
            </div>
            <div>
            {filteredChannels.map(channel => (
                <>
                    <div >
                        <NavLink 
                            style={{ textDecoration: 'none', color: 'white' }} 
                            to={`/servers/${channel.server_id}/${channel.id}/messages`} 
                            onClick={() => setCurrChannel(channel.id)}
                            >
                            {channel.name}
                        </NavLink>
                        <EditChannelLiveModal channel={channel} />
                        <DeleteChannelLiveModal channelId={channel.id}/>
                    </div>
                </>
            ))
            }   
            </div>

        </div>
    )
}

export default ChannelsSection