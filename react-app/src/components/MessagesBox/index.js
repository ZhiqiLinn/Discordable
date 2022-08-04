import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import ChannelsSection from "../ChannelsSection"
import ServerSideBar from "../ServersPage/ServerSideBar"
import './MessagesBox.css'

const MessagesBox = () => {
    const {chanId} = useParams()
    const allMessagesArr = useSelector(state => state.messageState)
    return (
        <div className="server-page-layout">  
            <ServerSideBar />
            <ChannelsSection selectedChanId={chanId}/>
            <div className="message-box-layout">
                <h1>MESSAGE BOX {chanId}</h1>

            </div>
        </div>
    )
}

export default MessagesBox