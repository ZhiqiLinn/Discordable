import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom";
import ServerProfilePage from "../ServerProfilePage";
import { getAllServersThunk } from "../../store/server";
import ChannelsSection from "../ChannelsSection";
import CreateServerLiveModal from "../CreateServerLiveModal"
import MembersList from "../MembersList";
import MessagesBox from "../MessagesBox";
import './ServerDetail.css'

const ServerDetailPage = () => {
    const {serverId} = useParams()
    const allServersArr = Object.values(useSelector(state => state.serverState))
    const currentServer = allServersArr.filter(server => server.id == +serverId)[0]
    console.log("curr server", currentServer)
    return(
        <>
            <NavLink to={`/servers/${serverId}/profile`} >
                Click to Edit Server
            </NavLink>
            <div className="server-detail-page-container">
                <div>
                    <ChannelsSection serverId={serverId} currentServer={currentServer}/>
                </div>
                <div>
                    <MessagesBox serverId={serverId} currentServer={currentServer}/>
                </div>
                <div>
                    <MembersList serverId={serverId} currentServer={currentServer}/>
                </div>
            </div>
        </>
        
    )
}

export default ServerDetailPage