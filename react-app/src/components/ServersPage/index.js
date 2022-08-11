import { useSelector } from "react-redux"
import ServerSideBar from "./ServerSideBar";
import './ServersPage.css'
import ExploreServers from "../JoinServer/ExploreServers";

const ServersPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    return(
        <div className="server-page-layout">
            <ServerSideBar />
            <div>
                <ExploreServers />
            </div>

        </div>
        
    )
}

export default ServersPage