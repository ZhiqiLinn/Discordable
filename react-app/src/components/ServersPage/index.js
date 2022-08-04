import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { getAllServersThunk } from "../../store/server";
import ChannelsSection from "../ChannelsSection";
import CreateServerLiveModal from "../CreateServerLiveModal"
import MembersList from "../MembersList";
import MessagesBox from "../MessagesBox";
import ServerSideBar from "./ServerSideBar";
import './ServersPage.css'
const ServersPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    return(
        <div className="server-page-layout">
            <ServerSideBar />
            <div>
                <h1>WELCOME, PLEASE SELECT YOUR SERVER</h1>
            </div>
        </div>
        
    )
}

export default ServersPage