import { useSelector } from "react-redux"
import ServerSideBar from "./ServerSideBar";
import './ServersPage.css'
import UserProfileBar from "../UserProfile/UserProfileBar";

const ServersPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    return(
        <div className="server-page-layout">
            <ServerSideBar />
            <div>
                <h1>WELCOME, PLEASE SELECT YOUR SERVER</h1>
            </div>
            <div className="server-user-logout-container">
                        <UserProfileBar />
            </div>
        </div>
        
    )
}

export default ServersPage