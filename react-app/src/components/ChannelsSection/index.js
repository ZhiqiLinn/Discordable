import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { getAllChannelsThunk } from "../../store/channel";
import CreateChannelLiveModal from "../CreateChannelLiveModal";
import DeleteChannelLiveModal from "../DeleteChannelLiveModal";


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
        <>
        <CreateChannelLiveModal />
        {filteredChannels.map(channel => (
                <div>
                    <NavLink to={`/servers/${channel.server_id}/${channel.id}`}>
                        {channel.name}
                    </NavLink>
                    <DeleteChannelLiveModal channelId={channel.id}/>
                </div>
        ))
        }   
        </>
    )
}

export default ChannelsSection