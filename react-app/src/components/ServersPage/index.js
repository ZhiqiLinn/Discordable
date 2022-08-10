import { useSelector } from "react-redux"
import ServerSideBar from "./ServerSideBar";
import './ServersPage.css'
import UserProfileBar from "../UserProfile/UserProfileBar";
import ExploreServers from "../JoinServer/ExploreServers";

const ServersPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    return(
        <div className="server-page-layout">
            <ServerSideBar />
            <div>
                <ExploreServers />
            </div>
            <div className="server-user-logout-container">
                <UserProfileBar />
            </div>
        </div>
        
    )
}

export default ServersPage