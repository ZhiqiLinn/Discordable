import React, { useState } from 'react';
import { DarkModal } from '../../context/DarkModal';
import { useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { deleteChannelThunk } from "../../store/channel";


const DeleteChannelLiveModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId, chanId} = useParams();
    const [showModal, setShowModal] = useState(false);
    console.log("THIS IS CHAN ID:",chanId)
    const handleDeleteSubmit = () => {
        dispatch(deleteChannelThunk(chanId));
        history.push(`/servers`);

    }

    return (
        <>
            <span  onClick={() => setShowModal(true)}> 🗑️ </span>
            {showModal && (
                <div>
                    <DarkModal onClose={() => setShowModal(false)}>
                        <div >
                            <h1>DO YOU REALLY WANNA DELETE THIS CHANNEL???</h1>
                            <div >
                                <button onClick={() => setShowModal(false)}>Cancel</button>
                                <button onClick={handleDeleteSubmit}>Delete</button>
                            </div>
                        </div>
                    </DarkModal>
                </div>
            )}
        </>
    )
}
    

export default DeleteChannelLiveModal;