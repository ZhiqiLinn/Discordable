import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { getAllMessagesForChannelThunk } from "../../store/messages";
import { addMessageThunk } from "../../store/messages";
import './MessagesBox.css'

let socket;

const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const {chanId} = useParams()
    // const [messages, setMessages] = useState([])
    const [chatMsg, setChatMsg] = useState("");
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let errors = []
        let messageArr = chatMsg.split(' ').join('')
        if (messageArr.length < 1 || messageArr.length > 500) errors.push("Message length between 0 - 500 charatcers, not include whitespace, message shouldn't include only whitespace.")
        setErrors(errors);
    }, [chatMsg]);

    useEffect(() => {
        dispatch(getAllMessagesForChannelThunk(chanId))
        // dispatch(getAllChannelsByServerThunk(serverId))
    }, [chanId]);


    useEffect(() => {

        // create websocket
        socket = io();
        
        io.connect('http://discordable.herokuapp.com/',{'connect timeout': 1000});

        socket.emit('join', { channel_id: chanId, username: user.username })

        socket.on("chat", (chat) => {

            dispatch(getAllMessagesForChannelThunk(chanId))
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
            // setMessages("")
        })
    }, [chanId, user.username])


    const updateChatInput = (e) => {
        setChatMsg(e.target.value)
    };
    
    const sendChat = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        const msgPayload = {
            user_id: user.id,
            message: chatMsg,
            channel_id: chanId,
            created_at: new Date()
        }

        let newMsg;
        if (!errors.length) {
            newMsg = await dispatch(addMessageThunk(msgPayload))
            // emit a message
            socket.emit("chat", { user: user.username, msg: chatMsg, channel_id: chanId });
            // clear the input field after the message is sent
            setChatMsg("")
            setHasSubmitted(false);
        }
        
    }

    return(
        <>
            <div className="create-msg-container">
            <div>
                {hasSubmitted && errors &&
                <div id='error-msg'>
                    {errors.map((error, ind) => (
                        <div key={ind} style={{ color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                    ))}
                </div>
                }
            </div>

            <form onSubmit={sendChat}>
                <div className="input-div">

                    <input
                        value={chatMsg}
                        onChange={updateChatInput}
                    />
                    <button type="submit" className="send-msg-btn" >Send</button>
                </div>
            </form>
            </div>
        </>
    )
};

export default Chat