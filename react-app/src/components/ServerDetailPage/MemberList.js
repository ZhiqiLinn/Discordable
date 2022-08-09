import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import './ServerDetail.css'

const MemberList = () => {
    const dispatch = useDispatch()
    const {serverId} = useParams()
    const [serverMembers, setServerMembers] = useState({})
    const [serverMembersArr, setServerMembersArr] = useState([])
    const servers = useSelector(state => state.serverState)
    const currentServer = servers[parseInt(serverId)]
    // console.log("!!!!!!THIS IS CURRRENT SERVER",currentServer)
    
    // console.log("!!!!!!!!!tHIS IS CURRENT SERVER'S MEMBER LIST", serverMembersArr)



    useEffect(() => {
        setServerMembers(currentServer?.serverMembers)
        if(serverMembers){
            setServerMembersArr(Object.values(serverMembers))
        }
    },[currentServer])


    return(
        <>
            {currentServer && 
                    <div>
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