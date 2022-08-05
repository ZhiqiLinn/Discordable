import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

import { useParams } from "react-router-dom"
import { getAllMessagesForChannelThunk } from "../../store/messages"
import ChannelsSection from "../ChannelsSection"
import ServerSideBar from "../ServersPage/ServerSideBar"
import './MessagesBox.css'

const MessagesBox = () => {
    const {chanId} = useParams()
    const dispatch = useDispatch()
    const allMessagesArr = Object.values(useSelector(state => state.messageState))

    useEffect(() => {
        dispatch(getAllMessagesForChannelThunk(chanId))
    }, [chanId]);
    return (
        <div className="server-page-layout">  
            <ServerSideBar />
            <ChannelsSection selectedChanId={chanId}/>
            <div className="message-box-layout">
                { allMessagesArr && allMessagesArr.map(msg => (
                    <div>
                        <p>
                            {msg.created_at}
                        </p>
                        <p>
                            {msg.message}
                        </p>
                    </div>
                ))

                }
            </div>
        </div>
    )
}

export default MessagesBox