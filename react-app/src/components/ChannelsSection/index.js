import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { getAllChannelsThunk } from "../../store/channel";
import CreateChannelLiveModal from "../CreateChannelLiveModal";
import DeleteChannelLiveModal from "../DeleteChannelLiveModal";
import EditChannelLiveModal from "../EditChannelLiveModal"
import ServerSideBar from "../ServersPage/ServerSideBar";
import MessagesBox from "../MessagesBox";


const ChannelsSection = () => {
    const {serverId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const allChannelsArr = Object.values(useSelector(state => state.channelState))
    const filteredChannels = allChannelsArr.filter(channel => channel.server_id == +serverId)
    // console.log("!!FILTERED CHANNELS", filteredChannels)


    useEffect(()=> {
        dispatch(getAllChannelsThunk())
    },[])
    return (
        <div className="server-page-layout">
            <div>
                <ServerSideBar />
            </div>
            <div>
                <CreateChannelLiveModal />
            </div>
            <div>
            {filteredChannels.map(channel => (
                    <div>
                        <NavLink to={`/servers/${channel.server_id}/${channel.id}`}>
                            {channel.name}
                        </NavLink>
                        <EditChannelLiveModal channel={channel} />
                        <DeleteChannelLiveModal channelId={channel.id}/>
                    </div>
            ))
            }   
            </div>
            <div>
                <MessagesBox />
            </div>
        </div>
    )
}

export default ChannelsSection