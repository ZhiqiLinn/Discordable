import React, {  useEffect, useState } from 'react';
import { MsgModal } from '../../context/MsgModal';
import { useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { deleteChannelThunk } from "../../store/channel";
import { deleteMessageThunk } from '../../store/messages';
import {getAllMessagesForChannelThunk } from "../../store/messages"


const DeleteMessageModal = ({msgId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId, chanId} = useParams();
    const [showModal, setShowModal] = useState(false);
    // console.log("msgiod",msgId)
    const handleDeleteSubmit = () => {
        dispatch(deleteMessageThunk(msgId))
        history.push(`/servers/${serverId}/${chanId}`);

    }

    // useEffect(() => {
    //     dispatch(getAllMessagesForChannelThunk(chanId))
    // }, [chanId]);


    return (
        <>
            <span  onClick={() => setShowModal(true)}> <i class="fa-solid fa-trash-can" style={{cursor:"pointer"}}></i> </span>
            {showModal && (
                <div>
                    <MsgModal onClose={() => setShowModal(false)}>
                        <div >
                            <h1>Delete Msg?</h1>
                            <div >
                                <button onClick={() => setShowModal(false)}>Cancel</button>
                                <button onClick={handleDeleteSubmit}>Delete</button>
                            </div>
                        </div>
                    </MsgModal>
                </div>
            )}
        </>
    )
}
    

export default DeleteMessageModal;