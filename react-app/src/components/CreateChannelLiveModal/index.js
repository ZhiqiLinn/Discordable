import React, { useState } from 'react';
import { DarkModal } from '../../context/DarkModal';
import CreateChannelForm from './CreateChannelForm';


const CreateChannelLiveModal = () => {
    const [showModal, setShowModal] = useState(false);
    const hideForm = () => {
        setShowModal(false)
    }
    return (
        <>
            <div className='create-channel-container'>
                <div  onClick={() => setShowModal(true)}> CHANNEL     +</div>
            </div>
            {showModal && (
                <div>
                    <DarkModal onClose={() => setShowModal(false)} >
                        <CreateChannelForm hideForm={hideForm}/>
                    </DarkModal>
                </div>
            )}
        </>
    )
}
    

export default CreateChannelLiveModal;