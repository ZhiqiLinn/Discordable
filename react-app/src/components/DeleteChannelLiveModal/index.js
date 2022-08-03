import React, { useState } from 'react';
import { DarkModal } from '../../context/DarkModal';
import DeleteChannelForm from './DeleteChannelForm';


const DeleteChannelLiveModal = ({channelId}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button  onClick={() => setShowModal(true)}>🗑️</button>
            {showModal && (
                <div>
                    <DarkModal onClose={() => setShowModal(false)}>
                        <DeleteChannelForm channelId={channelId}/>
                    </DarkModal>
                </div>
            )}
        </>
    )
}
    

export default DeleteChannelLiveModal;