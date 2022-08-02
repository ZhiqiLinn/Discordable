import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { getAllServersThunk } from "../../store/server";
import ChannelsSection from "../ChannelsSection";
import CreateServerLiveModal from "../CreateServerLiveModal"
import MembersList from "../MembersList";
import MessagesBox from "../MessagesBox";
import './ServerDetail.css'

const ServerDetailPage = () => {

    return(
        <div className="server-detail-page-container">
            <div>
                <ChannelsSection />
            </div>
            <div>
                <MessagesBox />
            </div>
            <div>
                <MembersList />
            </div>
        </div>
        
    )
}

export default ServerDetailPage