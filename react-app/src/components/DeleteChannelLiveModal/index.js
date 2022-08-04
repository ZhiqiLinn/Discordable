import React, { useState } from 'react';
import { DarkModal } from '../../context/DarkModal';
import DeleteChannelForm from './DeleteChannelForm';


const DeleteChannelLiveModal = ({channelId}) => {
    const [showModal, setShowModal] = useState(false);

    const hideForm = () => {
        setShowModal(false)
    }

    return (
        <>
            <button  onClick={() => setShowModal(true)}>🗑️</button>
            {showModal && (
                <div>
                    <DarkModal onClose={() => setShowModal(false)}>
                        <div></div>
                        <DeleteChannelForm channelId={channelId} hideForm={hideForm}/>
                    </DarkModal>
                </div>
            )}
        </>
    )
}
    

export default DeleteChannelLiveModal;