import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react";

import { useParams } from "react-router-dom"
import {getAllMessagesForChannelThunk } from "../../store/messages"
import { getAllChannelsByServerThunk } from "../../store/channel";

import ChannelsSection from "../ChannelsSection"
import ServerSideBar from "../ServersPage/ServerSideBar"
import './MessagesBox.css'
import MemberList from "../ServerDetailPage/MemberList";
import CreateMessageBar from "./CreateMessagesBar";
import DeleteMessageModal from "./DeleteMessage";
import EditMessage from "./EditMessage";

const MessagesBox = () => {
    const {serverId, chanId} = useParams()
    const dispatch = useDispatch()
    const allMessagesArr = Object.values(useSelector(state => state.messageState))
    const [users, setUsers] = useState([])
    const AllChannels = Object.values(useSelector(state => state.channelState.serverChannels))
    const sessionUser = useSelector(state => state.session.user)
    // console.log(users)
    useEffect(() => {
        dispatch(getAllMessagesForChannelThunk(chanId))
        dispatch(getAllChannelsByServerThunk(serverId))
    }, [chanId, serverId]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [sessionUser]);

    const findUserInfo = (userId) => {
        let result = users.filter(user => user.id === +userId);
        return result[0]
    }
    const findChanInfo = (chanId) => {
        let result = AllChannels.filter(chan =>  chan.id === +chanId)
        return result[0]
    }

  

    return (
        <div className="server-page-layout">  
            <ServerSideBar />
            <ChannelsSection selectedChanId={chanId}/>
            <div className="message-box-layout">
                <div className="msg-channel-name-container">
                    <p><i className="fa-solid fa-hashtag"></i> { findChanInfo(chanId)?.name}</p>
                </div >
                <div className="all-msg-container">
                    { allMessagesArr && allMessagesArr.map(msg => (
                        <div className="msg-div">
                            <div>
                                <img className="msg-user-pic" src={findUserInfo(msg.user_id)?.profile_pic}></img>
                            </div>
                            <div>
                                <div>
                                    <p>{findUserInfo(msg.user_id)?.username} <span style={{color:"grey", fontSize:"small"}}>{msg.created_at}</span></p>
                                </div>
                                {sessionUser.id === msg.user_id ? 
                                    (<div>
                                        <p>{msg.message} </p>
                                        <EditMessage msgId={msg.id}/>
                                        <DeleteMessageModal msgId={msg.id}/>
                                    </div>)
                                    : (<p>{msg.message}</p>) 
                                }
                            </div>
                        </div>
                    ))

                    }

                </div>
                <CreateMessageBar />
            </div>
            <MemberList AllChannels={AllChannels}/>
        </div>
    )
}

export default MessagesBox