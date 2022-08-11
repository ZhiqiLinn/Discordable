import React, { useState } from 'react';
import { SmallModal } from '../../context/SmallModal';
import { useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { deleteChannelThunk } from "../../store/channel";
import './DeleteChannel.css'

const DeleteChannelLiveModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId, chanId} = useParams();
    const [showModal, setShowModal] = useState(false);
    // console.log("THIS IS CHAN ID:",chanId)
    const handleDeleteSubmit = () => {
        dispatch(deleteChannelThunk(chanId));
        history.push(`/servers/${serverId}`);

    }

    return (
        <>
            <span  onClick={() => setShowModal(true)} style={{cursor:"pointer"}}> 🗑️ </span>
            {showModal && (
                <div>
                    <SmallModal onClose={() => setShowModal(false)}>
                        <div className='delete-server-container'>
                            <h2>Please confirm that you would like to delete this channel.</h2>
                            <div >
                                <button className='btn' onClick={() => setShowModal(false)}>No</button>
                                <br></br>
                                <button className='btn' onClick={handleDeleteSubmit}>Yes</button>
                            </div>
                        </div>
                    </SmallModal>
                </div>
            )}
        </>
    )
}
    

export default DeleteChannelLiveModal;