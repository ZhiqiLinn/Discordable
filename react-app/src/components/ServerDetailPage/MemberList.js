import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import './ServerDetail.css'

const MemberList = () => {
    const {serverId} = useParams()
    const [serverMembers, setServerMembers] = useState({})
    const [serverMembersArr, setServerMembersArr] = useState([])
    const servers = useSelector(state => state.serverState)
    const currentServer = servers[parseInt(serverId)]




    useEffect(() => {
        setServerMembers(currentServer?.serverMembers)
        if(serverMembers){
            setServerMembersArr(Object.values(serverMembers))
        }
    },[currentServer])


    return(
        <>
            {currentServer && 
                    <div className="members-container">
                        <div>
                            {currentServer.default_role}:
                            <hr></hr>
                        <div>
                            * {currentServer.owner.username}
                        </div>
                            { serverMembersArr && serverMembersArr.map((member, index) => (
                                <p key={index}>{member.member_username}</p>
                            ))}
                        </div>
                    </div>
            }
        </>
    )
}

export default MemberList